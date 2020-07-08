class ProjectModel {

    constructor() {};

    //项目内容的隐私状态
    static PERMISSION_STATUS = {
        ALL_PUBLIC: 1, //全公开的 (项目信息和具体文档)
        INFO_PUBLIC: 2, //信息是公开的 (只能查看项目信息, 不能看到文档)
        TEAM_PUBLIC: 3, //团队内全公开 (团队成员可以查看所有)
        INFO_TEAM_PUBLIC: 4 //只在团队内公开信息 (团队成员只能查看项目信息)
        // ONLY_PARTICIPANT: 5 //仅参加者 (项目信息和具体文档只有项目参与者能看见)
    };

    //项目的状态
    static PROJECT_STATUS = {
        1: "未开始",
        2: "进行中",
        3: "已完成",
        4: "已中止"
    };

    //翻译的语言
    static TRANS_LANGUAGE = [
        "中文(简体)",
        "中文(繁体)",
        "英语",
        "日语",
        "韩语",
        "法语",
        "俄语",
        "德语",
        "印度语",
        "意大利语"
    ];


    //获取项目状态说明
    static findProjectStatusDesc(status) {
        return this.PROJECT_STATUS[status];
    }
}


export {
    ProjectModel
}