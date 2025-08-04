import fs from 'node:fs';

/**
 * 同步版本：获取指定路径下的文件夹列表（非递归）
 * @param {string} targetPath - 要查询的目标路径
 * @returns {string[]} - 返回文件夹名称数组
 */
export function getFoldersSync(targetPath) {
  try {
    // 同步读取目录内容
    const items = fs.readdirSync(targetPath, { withFileTypes: true });
    
    // 过滤出文件夹并返回文件夹名称数组
    const folders = items
      .filter(item => item.isDirectory())
      .map(item => item.name);
    
    return folders;
  } catch (error) {
    // 处理错误，如路径不存在或无权限访问
    console.error(`获取文件夹列表失败: ${error.message}`);
    throw error;
  }
}
