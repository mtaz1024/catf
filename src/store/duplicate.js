export default {
    data() {
        return {
            searchList: [
                {
                    name: '种类',
                    list: [
                        {
                            value: '狸花猫',
                            number: 1
                        },
                        {
                            value: '橘猫',
                            number: 2
                        },
                        {
                            value: '奶牛猫',
                            number: 3
                        },
                        {
                            value: '三花猫',
                            number: 4
                        },
                        {
                            value: '玳瑁猫',
                            number: 5
                        },
                        {
                            value: '狮子猫',
                            number: 6
                        },
                        {
                            value: '其他',
                            number: 0
                        }
                    ],
                    checkList: []
                },
                {
                    name: '年龄',
                    list: [
                        {
                            number: 1,
                            value: '0~2个月'
                        },
                        {
                            number: 2,
                            value: '3~5个月'
                        },
                        {
                            number: 3,
                            value: '6~12个月'
                        },
                        {
                            number: 4,
                            value: '1~3岁'
                        },
                        {
                            number: 5,
                            value: '4~6岁'
                        },
                        {
                            number: 6,
                            value: '7~9岁'
                        },
                        {
                            number: 7,
                            value: '10岁以上'
                        },
                        {
                            value: '其他',
                            number: 0
                        }],
                    checkList: []
                },
                {
                    name: '性别',
                    list: [
                        {
                            value: '女孩子',
                            number: 1
                        },
                        {
                            value: '男孩子',
                            number: 2
                        },
                        {
                            value: '不明',
                            number: 0
                        }
                    ],
                    checkList: []
                }
            ],
            livingSelect: [
                {
                    value: 1,
                    label: '独自居住'
                },
                {
                    value: 2,
                    label: '合租'
                },
                {
                    value: 3,
                    label: '宿舍'
                }
            ],
            workSelect: [
                {
                    value: 1,
                    label: '稳定工作'
                },
                {
                    value: 2,
                    label: '读书'
                },
                {
                    value: 3,
                    label: '无工作'
                }
            ],
            catSelect: [
                {
                    value: 1,
                    label: '没养过猫'
                },
                {
                    value: 2,
                    label: '曾经有猫'
                },
                {
                    value: 3,
                    label: '目前有猫'
                }
            ],
            typeSelect: [
                {
                    value: 1,
                    label: '狸花猫'
                },
                {
                    value: 2,
                    label: '橘猫'
                },
                {
                    value: 3,
                    label: '奶牛猫'
                },
                {
                    value: 4,
                    label: '三花猫'
                },
                {
                    value: 5,
                    label: '玳瑁猫'
                },
                {
                    value: 6,
                    label: '狮子猫'
                },
                {
                    value: 0,
                    label: '其他'
                }
            ],
            ageSelect: [
                {
                    value: 1,
                    label: '0~2个月'
                },
                {
                    value: 2,
                    label: '3~5个月'
                },
                {
                    value: 3,
                    label: '6~12个月'
                },
                {
                    value: 4,
                    label: '1~3岁'
                },
                {
                    value: 5,
                    label: '4~6岁'
                },
                {
                    value: 6,
                    label: '7~9岁'
                },
                {
                    value: 7,
                    label: '10岁以上'
                },
                {
                    value: 0,
                    label: '其他'
                }
            ],
            monthSelect: [
                {
                    value: 1,
                    label: '0~2个月'
                },
                {
                    value: 2,
                    label: '2~5个月'
                },
                {
                    value: 3,
                    label: '5~8个月'
                },
                {
                    value: 4,
                    label: '8~12个月'
                },
                {
                    value: 5,
                    label: '1~3岁'
                }
            ],
            yearSelect: [
                {
                    value: 1,
                    label: '0~2个月'
                },
                {
                    value: 2,
                    label: '2~5个月'
                },
                {
                    value: 3,
                    label: '5~8个月'
                },
                {
                    value: 4,
                    label: '8~12个月'
                },
                {
                    value: 5,
                    label: '1~3岁'
                }
            ],
            genderSelect: [
                {
                    label: '女孩子',
                    value: 1
                },
                {
                    label: '男孩子',
                    value: 2
                },
                {
                    label: '不明',
                    value: 0
                }
            ],
            desexingSelect: [
                {
                    label: '未绝育',
                    value: 0
                },
                {
                    label: '已绝育',
                    value: 1
                }
            ],
            vaccinationSelect: [
                {
                    label: '未打疫苗',
                    value: 0
                },
                {
                    label: '已打疫苗',
                    value: 1
                }
            ],
            dewormingSelect: [
                {
                    label: '未驱虫',
                    value: 0
                },
                {
                    label: '已驱虫',
                    value: 1
                }
            ],
            healthSelect: [
                {
                    label: '不良',
                    value: 0
                },
                {
                    label: '良好',
                    value: 1
                }
            ],
            postState: [
                {
                    value: 0,
                    label: '无人申请'
                },
                {
                    value: 1,
                    label: '待审核'
                },
                {
                    value: 2,
                    label: '已领养'
                }
            ],
            applyState: [
                [0, '审核中'],
                [1, '未通过'],
                [2, '已通过'],
                [3, '已取消'],
                [4, '原帖已被删除']
            ],
            adoptState: [
                {
                    value: 0,
                    label: '审核中'
                },
                {
                    value: 1,
                    label: '未通过'
                },
                {
                    value: 2,
                    label: '已通过'
                },
                {
                    value: 3,
                    label: '已取消'
                },
                {
                    value: 4,
                    label: '原帖已被删除'
                },

            ],
            roleSelect: [
                [0, ''], // 管理员
                [1, ''], // 拥有发布权限
                [2, ''], // 不拥有发布权限
            ]
        }
    }
}