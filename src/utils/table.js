// 自适应表格列宽
export const flexColumnWidth = (str, tableData, title="", flag = 'max') => {
    // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
    // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
    // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
    str = str + ''
    let columnContent = ''
    if (!tableData || !tableData.length || tableData.length === 0) {
        return
    }
    if (!str || !str.length || str.length === 0) {
        return
    }
    if (flag === 'equal') {
        // 获取该列中第一个不为空的数据(内容)
        for (let i = 0; i < tableData.length; i++) {
            if (tableData[i][str].length > 0) {
                // console.log('该列数据[0]:', tableData[0][str])
                columnContent = tableData[i][str]
                break
            }
        }
    } else {
        // 获取该列中最长的数据(内容)
        let index = 0
        for (let i = 0; i < tableData.length; i++) {
            if (tableData[i][str] === null) {
                return
            }
            const now_temp = tableData[i][str] + ''
            const max_temp = tableData[index][str] + ''
            if (now_temp.length > max_temp.length) {
                index = i
            }
        }
        columnContent = tableData[index][str]
    }
    // console.log('该列数据[i]:', columnContent)
    // 以下分配的单位长度可根据实际需求进行调整
    const getWidth = (val) => {
        let width = 0
        for (const char of val) {
            if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
                // 如果是英文字符，为字符分配12个单位宽度
                width += 12
            } else if (char >= '\u4e00' && char <= '\u9fa5') {
                // 如果是中文字符，为字符分配15个单位宽度
                width += 20
            } else {
                // 其他种类字符，为字符分配12个单位宽度
                width += 12
            }
        }
        return width
    }
    let flexWidth = getWidth(columnContent)
    let titleWidth = 0
    if (title !== "") {
        titleWidth = getWidth(title)
    }
    if (flexWidth < 120) {
        // 设置最小宽度
        flexWidth = 120
    }
    // if (flexWidth > 250) {
    //   // 设置最大宽度
    //   flexWidth = 250
    // }
    return Math.max(flexWidth, titleWidth) + 'px'
}

export const flexTableHeight = () => {
    // header 60
    // el-form-item 50
    // el-pagination 32
    // padding-top 10
    // padding-bottom 10
    return window.innerHeight - 162 + 'px'
}
