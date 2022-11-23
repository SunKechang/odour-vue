//导入依赖项
import FileSaver from "file-saver";
import XLSX from "xlsx";
//导入uuid.js工具
import { v4 as uuidv4 } from "uuid";

/**
 * elemet-ui el-table数据导出为xlsx表格
 * @param {*} _targetId Element-UI el-table组件的id值
 */
export const exportTableAsXLSX = function(_targetId) {
    //根据table生成Book工作簿
    let wb = XLSX.utils.table_to_book(document.getElementById(_targetId));
    //将Book工作簿作为输出
    console.log('sssss')
    console.log(wb)
    let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
    });
    //尝试将当前table内容保存为excel文件
    try {
        FileSaver.saveAs(
            //被导出的blob二进制对象
            new Blob([wbout], { type: "application/octet-stream" }),
            //导出文件的名称+后缀名
            uuidv4() + ".xlsx"
        );
    } catch (e) {
        if (typeof console != "undefined") console.log(e, wbout);
    }
};
export const exportTable2 = function(_targetId) {
    let excelName = uuidv4() + '.xlsx';
    var xlsxParam = { raw: true };//转换成excel时，使用原始的格式
    // 克隆节点
    let tables = document.getElementById(_targetId).cloneNode(true);
    // 判断是否为固定列，解决（为固定列时，会重复生成表格）
    if (tables.querySelector('.el-table__fixed') !== null) {
    tables.removeChild(tables.querySelector('.el-table__fixed'))
    }
    let table_book = XLSX.utils.table_to_book(tables,xlsxParam);
    var table_write = XLSX.write(table_book, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
    });
    try {
        FileSaver.saveAs(
            new Blob([table_write], { type: "application/octet-stream" }),
            excelName
        );
    } catch (e) {
        if (typeof console !== "undefined") console.log(e, table_write);
    }
}