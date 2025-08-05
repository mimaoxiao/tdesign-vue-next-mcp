import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { getFoldersSync } from '../utils/util';

function getCode() {
  try {
    execSync('git clone https://github.com/Tencent/tdesign-vue-next ./code');
    return true;
  } catch (e) {
    console.log('error', e);
    return false;
  }
}

function getComponentProps() {
  const tdesignPath = './code';
  const componentPath = 'packages/components';
  const componentList = getFoldersSync(path.join(tdesignPath, componentPath));

  const docList: { name: string; propsData: string | { type: string, props: string }[] }[] = [];
  
  componentList.forEach((name) => {
    try {
      const props = fs.readFileSync(path.join(tdesignPath, componentPath, name, `${name}.md`), 'utf-8');
      if (name === 'table') {
        const list: { type: string; props: string }[] = [];
        
        let primaryProps = props;
        primaryProps = primaryProps.replace(/### EnhancedTable Props\n\n[\s\S]*?\n\n/, '');
        primaryProps = primaryProps.replace(/### EnhancedTable Events\n\n[\s\S]*?\n\n/, '');
        primaryProps = primaryProps.replace(/### EnhancedTableInstanceFunctions 组件实例方法\n\n[\s\S]*?\n\n/, '');

        list.push({
          type: 'PrimaryTable',
          props: primaryProps,
        });
        list.push({
          type: 'EnhancedTable',
          props: props,
        });
        docList.push({
          name,
          propsData: list,
        });
      } else {
        docList.push({ name, propsData: props });
      }
    } catch (e) {
      console.log(`读取 ${name} 组件 md 文件失败: ${e}`);
    }
  });

  fs.writeFileSync('./document/componentProp.json', JSON.stringify(docList, null, 2), 'utf-8');
}

function getComponentExample() {
  const tdesignPath = './code';
  const componentPath = 'packages/components';
  const componentList = getFoldersSync(path.join(tdesignPath, componentPath));
  
  componentList.forEach((name) => {
    try {
      fs.mkdirSync(path.join('./document', name));

      let expPath = '';

      if (fs.existsSync(path.join(tdesignPath, componentPath, name, '_example-ts'))) {
        expPath = path.join(tdesignPath, componentPath, name, '_example-ts');
      } else if (fs.existsSync(path.join(tdesignPath, componentPath, name, '_example'))) {
        expPath = path.join(tdesignPath, componentPath, name, '_example');
      } else {
        throw new Error(`${name} 示例文件不存在`);
      }

      const exampleList = fs.readdirSync(expPath);
      exampleList.forEach((e) => {
        fs.copyFileSync(path.join(expPath, e), path.join('./document', name, e));
      });
    } catch (e) {
      console.log(`${name} 示例文件复制失败: ${e}`);
    }
  });
}

function removeCode() {
  fs.rmSync('./code', { recursive: true, force: true });
}

function main() {
  if (!getCode()) {
    return; 
  }
  
  fs.rmSync('./document', { recursive: true, force: true });
  fs.mkdirSync('./document');
  fs.copyFileSync('./componentList.json', './document/componentList.json');

  console.log('已下载代码');

  getComponentProps();

  console.log('组件参数文档生成完成');

  getComponentExample();

  console.log('组件demo复制完成');

  removeCode();

  console.log('流程结束');
}

main();
