const CONSTANTS = {
    APP_BASE_URL:'/jf',
    //APP_BASE_URL:'/hr',
    // APP_BASE_URL:'http://172.88.66.19:8885/jf',
    // APP_BASE_URL:'',
    LAST_UPDATE_LIST:{},
    menu_title_map:{
        dashboard_kpi:'整体业绩看板',
        dashboard_market:'市场环境概况',
        dashboard_branch:'分支机构现状',
        management_transaction:'交易统计报表',
        management_assetchange:'资产变动报表',
        management_cooperatedevelop:'合作开发报表',
        management_limithold:'限售持仓报表',
        management_customercount:'客户统计报表',
        managerxin_businessanalysis:'现金理财数据分析',
        managerxin_report:'现金理财数据分析',
        managerxin_assets:'现金理财数据分析',
        managerxin_analysis:'现金理财数据分析',
        query_self:'关联方证券查询',
        query_relation:'关联证券查询',
        import_data:'外部数据导入',

    },
    panel_explanation:{
        'cockpit':{//领导驾驶舱
            'market':{
                'zsgl':'指数概览指数概览指数概览指数概览指数概览指数概览指数概览指数概览指数概览指数概览指数概览指数概览指数概览指数概览指数概览',//指数概览
                'gpjy':'股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易股票交易',//股票交易
                'gjjy':'股基交易',//股基交易
            },
            'branch':{
                'jgxz':'机构现状'//机构现状
            }
        }
    },
    market_kine_name_map:{
        '000001':'graph_kline1',
        '399001':'graph_kline2',
        '399005':'graph_kline3',
        '399006':'graph_kline4'
    },
    branch_id_name_map:{
        _ZX:'中心营业厅',
        _A:'A类营业厅',
        _B:'B类营业厅',
        _C:'C类营业厅',
        _D:'D类营业厅',
        _E:'E类营业厅',
        _F:'F类营业厅',
        _X:'X类营业厅'
    },
    transaction_id_name_map:{
        origin:'1',
        day:'2',
        week:'3',
        month:'4',
        year:'5',
    },
    assetchange_id_name_map:{
        origin:'6',
        day:'7',
        month:'8',
    },
    cooperatedevelop_id_name:{
        dev:'9',
        count:'10'
    },
    limithold_id_name_map:{
        stream:'11',
        store:'12'
    },
    customercount_id_name_map:{
        origin:'13',
        subquery:'14',
        serquery:'15'
    },
    transaction_report_title_map:{
        origin:'财通证券日常业务交易统计原始日报表',
        day:'财通证券分支机构交易统计日报表',
        week:'财通证券分支机构交易统计周报表',
        month:'财通证券分支机构交易统计月报表',
        year:'财通证券分支机构交易统计年报表'
    },
    limithold_report_title_map:{
        stream:'限售非流通股变动流水统计表',
        store:'限售非流通股份持仓统计表'
    },
    customercount_report_title_map:{
        origin:'新开户情况合并报表',
        subquery:'分支机构资产分段查询',
        serquery:'融资融券日常业务统计'
    },
    cooperatedevelop_report_title_map:{
        dev:'营业部合作开发统计表',
        count:'营业部合作开发客户表'
    },
    assetchange_report_title_map:{
        origin:'财通证券分支机构资产变动原始日报表（含合作业务）',
        day:'财通证券分支机构资产变动日统计表',
        month:'财通证券分支机构资产变动月统计表'
    },
    managerxin_report_title:'申购赎回情况表',
    limithold_table_title_stream:[
        // {
        //     field_name:'branch_no',
        //     index_id:'001',
        //     name:'营业部编号',
        //     key:'1'
        // },
        // {
        //     field_name:'branch_name',
        //     index_id:'002',
        //     name:'营业部名称',
        //     key:'2'
        // },
        {
            field_name:'cust_no',
            index_id:'003',
            name:'客户号',
            key:'3'
        },
        {
            field_name:'stock_account',
            index_id:'004',
            name:'证券账户',
            key:'4'
        },
        {
            field_name:'open_date',
            index_id:'005',
            name:'开户时间',
            key:'5'
        },
        {
            field_name:'cust_name',
            index_id:'006',
            name:'客户姓名',
            key:'6'
        },
        {
            field_name:'stock_code',
            index_id:'007',
            name:'证券代码',
            key:'7'
        },
        {
            field_name:'stock_name',
            index_id:'008',
            name:'证券名称',
            key:'8'
        },
        {
            field_name:'change_stock_num',
            index_id:'009',
            name:'变动股数',
            key:'9'
        },
        {
            field_name:'change_stock_amount',
            index_id:'010',
            name:'变动市值(元)',
            key:'10'
        }
    ],
    limithold_table_title_store:[
        // {
        //     field_name:'branch_no',
        //     index_id:'001',
        //     name:'营业部编号',
        //     key:'1'
        // },
        // {
        //     field_name:'branch_name',
        //     index_id:'002',
        //     name:'营业部名称',
        //     key:'2'
        // },
        {
            field_name:'cust_no',
            index_id:'003',
            name:'客户号',
            key:'3'
        },
        {
            field_name:'stock_account',
            index_id:'004',
            name:'证券账户',
            key:'4'
        },
        {
            field_name:'open_date',
            index_id:'005',
            name:'开户时间',
            key:'5'
        },
        {
            field_name:'cust_name',
            index_id:'006',
            name:'客户姓名',
            key:'6'
        },
        {
            field_name:'stock_code',
            index_id:'007',
            name:'证券代码',
            key:'7'
        },
        {
            field_name:'stock_name',
            index_id:'008',
            name:'证券名称',
            key:'8'
        },
        {
            field_name:'stock_num',
            index_id:'009',
            name:'股数',
            key:'9'
        },
        {
            field_name:'stock_amount',
            index_id:'010',
            name:'市值（元）',
            key:'10'
        },
        {
            field_name:'avg_stock_amount',
            index_id:'011',
            name:'日均持仓市值（元）',
            key:'11'
        }
    ],
    cooperatedevelop_table_title_dev:[
       {
            field_name:'cust_no',
            index_id:'001',
            name:'客户号',
            key:'1'
        },
        {
            field_name:'cust_name',
            index_id:'002',
            name:'客户姓名',
            key:'2'
        },
        {
            field_name:'open_date',
            index_id:'003',
            name:'开户日期',
            key:'3'
        },
        {
            field_name:'relationship',
            index_id:'004',
            name:'关系',
            key:'4'
        },

        {
            field_name:'fare_ratio',
            index_id:'005',
            name:'净佣金比例',
            key:'5'
        },
        {
            field_name:'asset_ratio',
            index_id:'006',
            name:'资产比例',
            key:'6'
        },
        {
            field_name:'amount_ratio',
            index_id:'007',
            name:'成交量比例',
            key:'7'
        },
        // {
        //     field_name:'stock_amount',
        //     index_id:'008',
        //     name:'本期_股票交易量',
        //     key:'8'
        // },
        // {
        //     field_name:'fund_amount',
        //     index_id:'009',
        //     name:'本期_基金交易量',
        //     key:'9'
        // },
        // {
        //     field_name:'warrants_amount',
        //     index_id:'010',
        //     name:'本期_权证交易量',
        //     key:'10'
        // },
        // {
        //     field_name:'sfw_amount',
        //     index_id:'011',
        //     name:'本期_股基权交易量',
        //     key:'11'
        // },
        // {
        //     field_name:'sf_amount',
        //     index_id:'012',
        //     name:'本期_股基交易量',
        //     key:'12'
        // },
        // {
        //     field_name:'assure_amount',
        //     index_id:'013',
        //     name:'本期_担保品交易量',
        //     key:'13'
        // },
        {
            field_name:'total_amount',
            index_id:'014',
            name:'本期_总交易量',
            key:'14'
        },
        // {
        //     field_name:'commission',
        //     index_id:'015',
        //     name:'本期_佣金 ',
        //     key:'15'
        // },
        // {
        //     field_name:'net_commission',
        //     index_id:'016',
        //     name:'本期_净佣金',
        //     key:'16'
        // },
        // {
        //     field_name:'assure_commission',
        //     index_id:'017',
        //     name:'本期_担保品佣金',
        //     key:'17'
        // },
        // {
        //     field_name:'assure_net_commission',
        //     index_id:'018',
        //     name:'本期_担保品净佣金',
        //     key:'18'
        // },
        // {
        //     field_name:'credit_amount',
        //     index_id:'019',
        //     name:'本期_信用交易量',
        //     key:'19'
        // },
        // {
        //     field_name:'credit_commission',
        //     index_id:'020',
        //     name:'本期_信用交易佣金',
        //     key:'20'
        // },
        // {
        //     field_name:'credit_net_commission',
        //     index_id:'021',
        //     name:'本期_信用交易净佣金',
        //     key:'21'
        // },
        {
            field_name:'total_commission',
            index_id:'022',
            name:'本期_总佣金',
            key:'22'
        },
        {
            field_name:'total_net_commission',
            index_id:'023',
            name:'本期_总净佣金',
            key:'23'
        },
        {
            field_name:'avialable_balance_avg',
            index_id:'024',
            name:'本期_日均资金余额',
            key:'24'
        },
        {
            field_name:'security_amount_avg',
            index_id:'025',
            name:'本期_日均证券市值',
            key:'25'
        },
        {
            field_name:'asset_avg',
            index_id:'026',
            name:'本期_日均资产',
            key:'26'
        },
        {
            field_name:'assure_cash_avg',
            index_id:'027',
            name:'本期_日均担保现金',
            key:'27'
        },
        {
            field_name:'assure_stock_amount_avg',
            index_id:'028',
            name:'本期_日均担保证券市值',
            key:'28'
        },
        {
            field_name:'debit_avg',
            index_id:'029',
            name:'本期_日均负债',
            key:'29'
        },
        {
            field_name:'avialable_balance_close',
            index_id:'030',
            name:'本期_期末资金余额',
            key:'30'
        },
        {
            field_name:'security_amount_close',
            index_id:'031',
            name:'本期_期末证券市值',
            key:'31'
        },
        {
            field_name:'asset_close',
            index_id:'32',
            name:'本期_期末资产',
            key:'32'
        },
        {
            field_name:'assure_cash_close',
            index_id:'33',
            name:'本期_期末担保现金',
            key:'33'
        },
        {
            field_name:'assure_stock_amount_close',
            index_id:'034',
            name:'本期_期末担保股票市值',
            key:'34'
        },
        {
            field_name:'debit_close',
            index_id:'035',
            name:'本期_期末负债',
            key:'35'
        },
        {
            field_name:'assure_close',
            index_id:'036',
            name:'本期_期末担保资产',
            key:'36'
        },
        {
            field_name:'b_stock_amount',
            index_id:'037',
            name:'本期_B股交易量',
            key:'37'
        },
        {
            field_name:'b_stock_commission',
            index_id:'038',
            name:'本期_B股交易佣金',
            key:'38'
        },
        {
            field_name:'b_stock_net_commission',
            index_id:'039',
            name:'本期_B股交易净佣金',
            key:'39'
        },
        {
            field_name:'h_stock_amount',
            index_id:'040',
            name:'本期_港股通交易量 ',
            key:'40'
        },
        {
            field_name:'h_stock_commission',
            index_id:'041',
            name:'本期_港股通交易佣金',
            key:'41'
        },
        {
            field_name:'h_stock_net_commission',
            index_id:'042',
            name:'本期_港股通交易净佣金',
            key:'42'
        },
        {
            field_name:'stock_commission',
            index_id:'043',
            name:'本期_股票交易佣金',
            key:'43'
        },
        {
            field_name:'sf_commission',
            index_id:'044',
            name:'本期_股基交易佣金',
            key:'44'
        },
        {
            field_name:'stock_commission_with_margin',
            index_id:'045',
            name:'本期_股票交易佣金（含融资融券）',
            key:'45'
        },
        {
            field_name:'stock_amount_with_margin',
            index_id:'046',
            name:'本期_股票交易金额（含融资融券）',
            key:'46'
        },
        {
            field_name:'sf_commission_with_margin',
            index_id:'047',
            name:'本期_股基交易佣金（含融资融券）',
            key:'47'
        },
        {
            field_name:'sf_amount_with_margin',
            index_id:'048',
            name:'本期_股基交易金额（含融资融券）',
            key:'48'
        }
    ],
    cooperatedevelop_table_title_count:[
        {
            field_name:'customer',
            index_id:'001',
            name:'客户',
            key:'1',
            isShow:'no'
        },
        {
            field_name:'branch_name',
            index_id:'002',
            name:'开户营业部',
            key:'2'
        },
        {
            field_name:'effect_date',
            index_id:'003',
            name:'生效日期',
            key:'3'
        },
        {
            field_name:'cust_status',
            index_id:'004',
            name:'状态',
            key:'4'
        },
        {
            field_name:'coop_branch_name',
            index_id:'005',
            name:'合作营业部',
            key:'5'
        },
        {
            field_name:'coop_branch_list',
            index_id:'006',
            name:'合作营业部列表',
            key:'6'
        },
        {
            field_name:'fare_ratio',
            index_id:'007',
            name:'开户营业部净佣金比例',
            key:'7'
        },
        {
            field_name:'asset_ratio',
            index_id:'008',
            name:'开户营业部资产比例',
            key:'8'
        },
        {
            field_name:'amount_ratio',
            index_id:'009',
            name:'开户营业部交易量比例',
            key:'9'
        },
        {
            field_name:'coop_fare_ratio_sum',
            index_id:'010',
            name:'合作营业部净佣金比例总和',
            key:'10'
        },
        {
            field_name:'coop_asset_ratio_sum',
            index_id:'011',
            name:'合作营业部资产比例总和',
            key:'11'
        },
        {
            field_name:'coop_amount_ratio_sum',
            index_id:'012',
            name:'合作营业部交易量比例总和',
            key:'12'
        }
    ],
    transaction_table_title_day:[
        {
            field_name:'trade_amount',
            index_id:'001',
            name:'当日_交易量(万)',
            key:'1',
        },
        {
            field_name:'all_trade_amount',
            index_id:'002',
            name:'累计_交易量(万)',
            key:'2'
        },
        {
            field_name:'commission',
            index_id:'003',
            name:'当日_佣金收入(万)',
            key:'3'
        },
        {
            field_name:'all_commission',
            index_id:'004',
            name:'累计_佣金收入(万)',
            key:'4'
        },
        {
            field_name:'open_cust_num',
            index_id:'005',
            name:'当日_新开户',
            key:'5'
        },
        {
            field_name:'all_open_cust_num',
            index_id:'006',
            name:'累计_新开户',
            key:'6'
        },
        {
            field_name:'market_rate',
            index_id:'007',
            name:'当日_市占率(股+基)%',
            key:'7'
        },
        {
            field_name:'all_market_rate',
            index_id:'008',
            name:'累计_市占率(股+基)%',
            key:'8'
        },
        {
            field_name:'check_market_rate_fd',
            index_id:'009',
            name:'考核累计(含基金分仓)市占率(股+基)%',
            key:'9'
        },
        {
            field_name:'lastyear_market_rate',
            index_id:'010',
            name:'去年_市占率(股+基)%',
            key:'10'
        },
        {
            field_name:'market_rate_change',
            index_id:'011',
            name:'市占率(股+基)%变动幅度',
            key:'11'
        },
        {
            field_name:'stock_rate',
            index_id:'012',
            name:'当日_股票费率(‰)',
            key:'12'
        },
        {
            field_name:'all_stock_rate',
            index_id:'013',
            name:'累计_股票费率(‰)',
            key:'13'
        },
        // {
        //     field_name:'stock_amount',
        //     index_id:'014',
        //     name:'当日_股票交易量（万）',
        //     key:'14'
        // },
        // {
        //     field_name:'all_stock_amount',
        //     index_id:'015',
        //     name:'累计_股票交易量（万）',
        //     key:'15'
        // },
        // {
        //     field_name:'stock_commission',
        //     index_id:'016',
        //     name:'当日_股票交易佣金（万）',
        //     key:'16'
        // },
        // {
        //     field_name:'all_stock_commission',
        //     index_id:'017',
        //     name:'累计_股票交易佣金（万）',
        //     key:'17'
        // }
    ],
    transaction_table_title_week:[
        {
            field_name:'trade_amount',
            index_id:'001',
            name:'本周_交易量(万)',
            key:'1'
        },
        {
            field_name:'all_trade_amount',
            index_id:'002',
            name:'累计_交易量(万)',
            key:'2'
        },
        {
            field_name:'commission',
            index_id:'003',
            name:'本周_佣金收入(万)',
            key:'3'
        },
        {
            field_name:'all_commission',
            index_id:'004',
            name:'累计_佣金收入(万)',
            key:'4'
        },
        {
            field_name:'open_cust_num',
            index_id:'005',
            name:'本周_新开户',
            key:'5'
        },
        {
            field_name:'all_open_cust_num',
            index_id:'006',
            name:'累计_新开户',
            key:'6'
        },
        {
            field_name:'trade_amount_rate',
            index_id:'007',
            name:'本周_市占率(股+基)%',
            key:'7'
        },
        {
            field_name:'all_trade_amount_rate',
            index_id:'008',
            name:'累计_市占率(股+基)%',
            key:'8'
        },
        {
            field_name:'check_market_rate_fd',
            index_id:'009',
            name:'考核累计市占率（含基金分仓）%',
            key:'9'
        },
        {
            field_name:'cust_right_avg',
            index_id:'010',
            name:'本周_日均客户权益(万)',
            key:'10'
        },
        {
            field_name:'cust_right_close',
            index_id:'011',
            name:'本周_期末客户权益(万)',
            key:'11'
        }
    ],
    transaction_table_title_month:[
        {
            field_name:'trade_amount',
            index_id:'001',
            name:'本月_交易量(万)',
            key:'1'
        },
        {
            field_name:'all_trade_amount',
            index_id:'002',
            name:'累计_交易量(万)',
            key:'2'
        },
        {
            field_name:'all_trade_amount_fd',
            index_id:'003',
            name:'累计_交易量(含基金分仓)',
            key:'3'
        },
        {
            field_name:'commission',
            index_id:'004',
            name:'本月_佣金收入(万)',
            key:'4'
        },
        {
            field_name:'commission_adjust',
            index_id:'005',
            name:'本月_佣金收入(万)(含手动调整)',
            key:'5'
        },
        {
            field_name:'all_commission',
            index_id:'006',
            name:'累计_佣金收入(万)',
            key:'6'
        },
        {
            field_name:'all_commission_adjust',
            index_id:'007',
            name:'累计_佣金收入(含手动调整)',
            key:'7'
        },
        {
            field_name:'open_cust_num',
            index_id:'008',
            name:'本月_新开户',
            key:'8'
        },
        {
            field_name:'all_open_cust_num',
            index_id:'009',
            name:'累计_新开户',
            key:'9'
        },
        {
            field_name:'market_rate',
            index_id:'010',
            name:'本月_市占率(股+基)%',
            key:'10'
        },
        {
            field_name:'all_market_rate',
            index_id:'011',
            name:'累计_市占率(股+基)%',
            key:'11'
        },
        {
            field_name:'check_market_rate_fd',
            index_id:'012',
            name:'累计_考核(含基金分仓)市占率(股+基)%',
            key:'12'
        },
        {
            field_name:'avg_cust_right',
            index_id:'013',
            name:'本月_日均客户权益(万)',
            key:'13'
        },
        {
            field_name:'end_cust_right',
            index_id:'014',
            name:'本月_期末客户权益(万)',
            key:'14'
        },
        {
            field_name:'cust_right',
            index_id:'015',
            name:'本月_客户权益(万)',
            key:'15'
        }
    ],
    transaction_table_title_year:[
        {
            field_name:'trade_amount',
            index_id:'001',
            name:'本年_交易量(万)',
            key:'1'
        },
        {
            field_name:'check_trade_amount_fd',
            index_id:'002',
            name:'本年_考核交易量(万)(含基金分仓)',
            key:'2'
        },
        {
            field_name:'market_rate',
            index_id:'003',
            name:'本年_市占率(股+基)%',
            key:'3'
        },
        {
            field_name:'check_market_rate_fd',
            index_id:'004',
            name:'本年_考核累计(含基金分仓)市占率(股+基)%',
            key:'4'
        },
        {
            field_name:'commission',
            index_id:'005',
            name:'本年_佣金收入(万)',
            key:'5'
        },
        {
            field_name:'commission_adjust',
            index_id:'006',
            name:'本年_佣金收入(万)(含手动调整)',
            key:'6'
        },
        {
            field_name:'open_cust_num',
            index_id:'007',
            name:'本年_新开户',
            key:'7'
        },
        {
            field_name:'commission_rate',
            index_id:'008',
            name:'本年_佣金费率(‰)',
            key:'8'
        },
        {
            field_name:'cust_right',
            index_id:'009',
            name:'本年_客户权益(万)',
            key:'9'
        },
        {
            field_name:'avg_cust_right',
            index_id:'010',
            name:'本年_日均客户权益(万)',
            key:'10'
        }
    ],
    assetchange_table_title_day:[
        {
            field_name:'secu_balance',
            index_id:'001',
            name:'当日_证券市值(万)',
            key:'1'
        },
        {
            field_name:'avialable_balance',
            index_id:'002',
            name:'当日_资金余额(万)（可用）',
            key:'2'
        },
        {
            field_name:'advisable_balance',
            index_id:'003',
            name:'当日_资金余额(万)（可取）',
            key:'3'
        },
        {
            field_name:'assure_asset',
            index_id:'004',
            name:'当日_担保品资产(万)',
            key:'4'
        },
        {
            field_name:'asset',
            index_id:'005',
            name:'当日_资产额(万)',
            key:'5'
        },
        {
            field_name:'in_secu_balance',
            index_id:'006',
            name:'当日_转入市值(万)',
            key:'6'
        },
        {
            field_name:'out_secu_balance',
            index_id:'007',
            name:'当日_转出市值(万)',
            key:'7'
        },
        {
            field_name:'in_deposit_balance',
            index_id:'008',
            name:'当日_存入资金(万)',
            key:'8'
        },
        {
            field_name:'out_deposit_balance',
            index_id:'009',
            name:'当日_取出资金(万)',
            key:'9'
        },
        {
            field_name:'asset_change_rate',
            index_id:'010',
            name:'资产日变动率(%)',
            key:'10'
        }
    ],
    assetchange_table_title_month:[
        {
            field_name:'secu_balance',
            index_id:'001',
            name:'本月_证券市值（万）',
            key:'1'
        },
        {
            field_name:'avg_deposit_balance',
            index_id:'002',
            name:'本月_日均保证金（万）',
            key:'2'
        },
        {
            field_name:'avg_assure_asset',
            index_id:'003',
            name:'本月_日均担保品资产（万）',
            key:'3'
        },
        {
            field_name:'avg_asset',
            index_id:'004',
            name:'本月_日均资产额（万）',
            key:'4'
        },
        {
            field_name:'in_secu_balance',
            index_id:'005',
            name:'本月转入市值（万）',
            key:'5'
        },
        {
            field_name:'out_secu_balance',
            index_id:'006',
            name:'本月转出市值（万）',
            key:'6'
        },
        {
            field_name:'in_capital_balance',
            index_id:'007',
            name:'本月存入保证金（万）',
            key:'7'
        },
        {
            field_name:'out_capital_balance',
            index_id:'008',
            name:'本月取出保证金（万）',
            key:'8'
        },
        {
            field_name:'asset_change_rate_over_month',
            index_id:'009',
            name:'资产月变动率（%）',
            key:'9'
        },
        {
            field_name:'all_avg_asset',
            index_id:'010',
            name:'本年日均资产额（万）',
            key:'10'
        },
        {
            field_name:'all_in_balance',
            index_id:'011',
            name:'本年累计转入市值（万）',
            key:'11'
        },
        {
            field_name:'all_out_balance',
            index_id:'012',
            name:'本年累计转出市值（万）',
            key:'12'
        },
        {
            field_name:'all_store_in_capital_balance',
            index_id:'013',
            name:'本年累计存入保证金（万）',
            key:'13'
        },
        {
            field_name:'all_take_out_capital_balance',
            index_id:'014',
            name:'本年累计取出保证金（万）',
            key:'14'
        },
        {
            field_name:'asset_change_rate_over_year',
            index_id:'015',
            name:'较上年资产变动率（%）',
            key:'15'
        },
    ],
    customercount_table_title_origin:[
        {
            field_name:'open_cust_num',
            index_id:'001',
            name:'开户数',
            key:'1'
        },
        {
            field_name:'asset_avg',
            index_id:'002',
            name:'日均资产',
            key:'2'
        },
        {
            field_name:'asset_exclude_finance_avg',
            index_id:'003',
            name:'日均资产（扣除理财）',
            key:'3'
        },
        {
            field_name:'asset',
            index_id:'004',
            name:'期末资产',
            key:'4'
        },
        {
            field_name:'commission',
            index_id:'005',
            name:'佣金',
            key:'5'
        },
        {
            field_name:'net_commission',
            index_id:'006',
            name:'净佣金',
            key:'6'
        },
        {
            field_name:'sf_amount',
            index_id:'007',
            name:'股基交易量',
            key:'7'
        },
    ],
    customercount_table_title_origin_child:[
        {
            field_name:'cust_no',
            index_id:'001',
            name:'客户编号',
            key:'1'
        },
        {
            field_name:'cust_name',
            index_id:'002',
            name:'客户名称',
            key:'2'
        },
        {
            field_name:'open_date',
            index_id:'003',
            name:'开户日期',
            key:'3'
        },
        {
            field_name:'open_way',
            index_id:'004',
            name:'开户方式',
            key:'4'
        },
        {
            field_name:'inner_trans_mark',
            index_id:'005',
            name:'内转客户（是/否）',
            key:'5'
        },
        {
            field_name:'limit_sale_mark',
            index_id:'006',
            name:'限售股客户（是否）',
            key:'6'
        },
        {
            field_name:'reward_mark',
            index_id:'007',
            name:'引流客户（是否）',
            key:'7'
        },
        {
            field_name:'coop_mark',
            index_id:'008',
            name:'合作开发标记（是否）',
            key:'8'
        },
        {
            field_name:'asset_ratio',
            index_id:'009',
            name:'资产比例',
            key:'9'
        },
    ],
    customercount_table_title_subquery:[
        {
            field_name:'avg_asset_section_name',
            index_id:'001',
            name:'资产范围',
            key:'1'
        },
        {
            field_name:'cust_num',
            index_id:'002',
            name:'客户数',
            key:'2'
        },
        // {
        //     field_name:'all_cust_num',
        //     index_id:'003',
        //     name:'总客户数',
        //     key:'3'
        // },
        {
            field_name:'cust_proportion',
            index_id:'004',
            name:'客户占比（%）',
            key:'4'
        },
        {
            field_name:'asset',
            index_id:'005',
            name:'资产额（万）',
            key:'5'
        },
        {
            field_name:'avg_asset',
            index_id:'006',
            name:'日均资产（万）',
            key:'6'
        },
        // {
        //     field_name:'all_asset',
        //     index_id:'007',
        //     name:'总资产（万）',
        //     key:'7'
        // },
        {
            field_name:'asset_proportion',
            index_id:'008',
            name:'资产占额（%）',
            key:'8'
        },
        {
            field_name:'commission',
            index_id:'009',
            name:'佣金（万）',
            key:'9'
        },
        // {
        //     field_name:'all_commission',
        //     index_id:'010',
        //     name:'总佣金（万）',
        //     key:'10'
        // },
        {
            field_name:'commission_proportion',
            index_id:'011',
            name:'佣金占比（%）',
            key:'11'
        },
        {
            field_name:'amount',
            index_id:'012',
            name:'交易量（万）',
            key:'12'
        },
        // {
        //     field_name:'all_amount',
        //     index_id:'013',
        //     name:'总交易量（万）',
        //     key:'13'
        // },
        {
            field_name:'amount_proportion',
            index_id:'014',
            name:'交易量占比（%）',
            key:'14'
        },
        {
            field_name:'limit_sale_stock_balance',
            index_id:'015',
            name:'限售股股票市值（万）',
            key:'15'
        },
    ],
    report_table_title:[
        {
            field_name:'init_date',
            index_id:'001',
            name:'日期',
            key:'1'
        },
        {
            field_name:'purchase_amount',
            index_id:'002',
            name:'申购',
            key:'2'
        },
        {
            field_name:'redemption_amount',
            index_id:'003',
            name:'赎回',
            key:'3'
        },
        {
            field_name:'minus_amount',
            index_id:'004',
            name:'申购-赎回',
            key:'4'
        }
    ],
    assets_table_title:[
        {
            title:'序号',
            dataIndex:'index',
            key:'index',


        },
        {
            title:'日期',
            dataIndex:'init_date',
            key:'init_date',
        },
        {
            title:'银证转账',
            children:[
                {
                    title:'银证转入',
                    dataIndex:'bank_in',
                    key:'bank_in'
                },
                {
                    title:'银证转出',
                    dataIndex:'bank_out',
                    key:'bank_out'
                },
                {
                    title:'合计',
                    dataIndex:'bank_sum',
                    key:'bank_sum'
                },
            ]
        },
        {
            title:'证券买卖',
            children:[
                {
                    title:'证券买入',
                    dataIndex:'secu_in',
                    key:'secu_in'
                },
                {
                    title:'证券卖出',
                    dataIndex:'secu_out',
                    key:'secu_out'
                },
                {
                    title:'合计',
                    dataIndex:'secu_sum',
                    key:'secu_sum'
                },
            ]
        },
        {
            title:'逆回购',
            children:[
                {
                    title:'拆出质押购回',
                    dataIndex:'reverse_in',
                    key:'reverse_in'
                },
                {
                    title:'质押回购拆出',
                    dataIndex:'reverse_out',
                    key:'reverse_out'
                },
                {
                    title:'合计',
                    dataIndex:'reverse_sum',
                    key:'reverse_sum'
                },
            ]
        },
        {
            title:'金融产品',
            children:[
                {
                    title:'金融产品赎回',
                    dataIndex:'fin_product_in',
                    key:'fin_product_in'
                },
                {
                    title:'金融产品购买',
                    dataIndex:'fin_product_out',
                    key:'fin_product_out'
                },
                {
                    title:'合计',
                    dataIndex:'fin_product_sum',
                    key:'fin_product_sum'
                },
            ]
        },
        {
            title:'其他业务',
            dataIndex:'other_business',
            key:'other_business'
        },
        {
            title:'净申购',
            dataIndex:'net_redemption',
            key:'net_redemption'
        }
    ],
    analysis_table_title:[
        {
            title:'序号',
            dataIndex:'index',
            key:'index'
        },
        {
            title:'客户名称',
            dataIndex:'cust_name',
            key:'cust_name'
        },
        {
            title:'客户ID',
            dataIndex:'cust_no',
            key:'cust_no'
        },
        {
            title:'营业部名称',
            dataIndex:'branch_name',
            key:'branch_name'
        },
        {
            title:'银证转账',
            children:[
                {
                    title:'银证转入',
                    dataIndex:'bank_in',
                    key:'bank_in'
                },
                {
                    title:'银证转出',
                    dataIndex:'bank_out',
                    key:'bank_out'
                },
                {
                    title:'合计',
                    dataIndex:'bank_sum',
                    key:'bank_sum'
                },
            ]
        },
        {
            title:'证券买卖',
            children:[
                {
                    title:'证券买入',
                    dataIndex:'secu_in',
                    key:'secu_in'
                },
                {
                    title:'证券卖出',
                    dataIndex:'secu_out',
                    key:'secu_out'
                },
                {
                    title:'合计',
                    dataIndex:'secu_sum',
                    key:'secu_sum'
                },
            ]
        },
        {
            title:'逆回购',
            children:[
                {
                    title:'拆出质押购回',
                    dataIndex:'reverse_in',
                    key:'reverse_in'
                },
                {
                    title:'质押回购拆出',
                    dataIndex:'reverse_out',
                    key:'reverse_out'
                },
                {
                    title:'合计',
                    dataIndex:'reverse_sum',
                    key:'reverse_sum'
                },
            ]
        },
        {
            title:'金融产品',
            children:[
                {
                    title:'金融产品赎回',
                    dataIndex:'fin_product_in',
                    key:'fin_product_in'
                },
                {
                    title:'金融产品购买',
                    dataIndex:'fin_product_out',
                    key:'fin_product_out'
                },
                {
                    title:'合计',
                    dataIndex:'fin_product_sum',
                    key:'fin_product_sum'
                },
            ]
        },
        {
            title:'其他业务',
            dataIndex:'other_business',
            key:'other_business'
        },
        {
            title:'净申购',
            dataIndex:'net_redemption',
            key:'net_redemption'
        }
    ],
    relation_table_title_defatlt:[
        // {
        //     field_name:'cust_name',
        //     index_id:'001',
        //     name:'客户姓名',
        //     key:'1'
        // },
        // {
        //     field_name:'id_no',
        //     index_id:'002',
        //     name:'身份证号/营业执照号',
        //     key:'2'
        // },
        // {
        //     field_name:'cust_status',
        //     index_id:'003',
        //     name:'账户状态',
        //     key:'3'
        // },
        {
            field_name:'stock_commission_rate',
            index_id:'004',
            name:'股票佣金率(‰)',
            key:'4'
        },
        {
            field_name:'margin_trade_balance',
            index_id:'005',
            name:'融资融券余额(元)',
            key:'5'
        },
        {
            field_name:'margin_trade_interest_expense',
            index_id:'006',
            name:'融资融券息费收入(元)',
            key:'6'
        },
        {
            field_name:'common_stock_commission',
            index_id:'007',
            name:'普通股票佣金收入(元)',
            key:'7'
        },
        {
            field_name:'open_fund_commission',
            index_id:'008',
            name:'开放式基金佣金收入(元)',
            key:'8'
        },
    ],
    transaction_table_title_day_child_trade_amount:{
        title:'下钻 - 当日_交易量(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'当日_股票交易量',dataIndex:'stock_amount',blank:4},          //add
            {name:'当日_股票质押交易量',dataIndex:'pledge_amount',blank:8},
            {name:'当日_基金交易量',dataIndex:'fund_amount',blank:4},
            // {name:'当日_权证交易量',dataIndex:'warrant_amount',blank:4},
            {name:'当日_融资融券股票交易量',dataIndex:'margin_stock_amount',blank:4},
            {name:'当日_融资融券基金交易量',dataIndex:'margin_fund_amount',blank:4},
            {name:'当日_融资融券债券交易量',dataIndex:'margin_bond_amount',blank:4},
            // {name:'当日_融资融券权证交易量',dataIndex:'margin_warrant_amount',blank:4}
        ]
    },
    transaction_table_title_day_child_commission:{
        title:'下钻 - 当日_佣金收入(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            // {name:'当日_股基权交易佣金',dataIndex:'sfw_fund_commission',blank:4},
            {name:'当日_股票交易佣金',dataIndex:'stock_commission',blank:8},
            {name:'当日_基金交易佣金',dataIndex:'fund_commission',blank:8},
            // {name:'当日_债券交易佣金',dataIndex:'fund_commission',blank:8},
            // {name:'当日_权证交易佣金',dataIndex:'warrant_commission',blank:8},
            // {name:'当日_融资融券佣金收入',dataIndex:'margin_commission',blank:4},
            {name:'当日_融资融券股票佣金收入',dataIndex:'margin_stock_commission',blank:8},
            {name:'当日_融资融券基金佣金收入',dataIndex:'margin_fund_commission',blank:8},
            {name:'当日_融资融券债券佣金收入',dataIndex:'margin_bond_commission',blank:8},
            // {name:'当日_融资融券权证佣金收入',dataIndex:'margin_warrant_commission',blank:8}
        ]
    },
    transaction_table_title_day_child_all_commission:{
        title:'下钻 - 累计_佣金收入(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'累计_股票交易佣金',dataIndex:'all_stock_commission',blank:4},
            // {name:'累计_股票交易佣金',dataIndex:'all_sfw_commission',blank:8},   //add
            {name:'累计_基金佣金收入',dataIndex:'all_fund_commission',blank:4},
            // {name:'累计_债券交易佣金',dataIndex:'all_fund_commission',blank:8},   //add
            // {name:'累计_权证佣金收入',dataIndex:'all_warrant_commission',blank:8},
            // {name:'累计_融资融券佣金收入',dataIndex:'all_margin_commission',blank:4},

            {name:'累计_融资融券股票佣金收入',dataIndex:'all_margin_stock_commission',blank:4},
            {name:'累计_融资融券基金佣金收入',dataIndex:'all_margin_fund_commission',blank:4},
            {name:'累计_融资融券债券佣金收入',dataIndex:'all_margin_bond_commission',blank:4},
            // {name:'累计_融资融券权证佣金收入',dataIndex:'all_margin_warrant_commission',blank:8}
        ]
    },
    transaction_table_title_week_child_trade_amount:{
        title:'下钻 - 本周_交易量(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'本周_股票交易量',dataIndex:'stock_amount',blank:4},
            {name:'本周_股票质押交易量',dataIndex:'pledge_amount',blank:8},
            {name:'本周_基金交易量',dataIndex:'fund_amount',blank:4},
            // {name:'本周_权证交易量',dataIndex:'warrant_amount',blank:4},
            {name:'本周_融资融券股票交易量',dataIndex:'margin_stock_amount',blank:4},
            {name:'本周_融资融券基金交易量',dataIndex:'margin_fund_amount',blank:4},
            {name:'本周_融资融券债券交易量',dataIndex:'margin_bond_amount',blank:4},
            // {name:'本周_融资融券权证交易量',dataIndex:'margin_warrant_amount',blank:4}
        ]
    },
    transaction_table_title_week_child_all_trade_amount:{
        title:'下钻 - 累计_交易量(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'累计_股票交易量',dataIndex:'all_stock_amount',blank:4},
            {name:'累计_股票质押交易量',dataIndex:'all_pledge_amount',blank:8},
            {name:'累计_基金交易量',dataIndex:'all_fund_amount',blank:4},
            // {name:'累计_权证交易量',dataIndex:'all_warrant_amount',blank:4},
            {name:'累计_融资融券股票交易量',dataIndex:'all_margin_stock_amount',blank:4},
            {name:'累计_融资融券基金交易量',dataIndex:'all_margin_fund_amount',blank:4},
            {name:'累计_融资融券债券交易量',dataIndex:'all_margin_bond_amount',blank:4},
            // {name:'累计_融资融券权证交易量',dataIndex:'all_margin_warrant_amount',blank:4}
        ]
    },
    transaction_table_title_week_child_commission:{
        title:'下钻 - 本周_佣金收入(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            // {name:'本周_股基权佣金收入',dataIndex:'sfw_commission',blank:4},
            {name:'本周_股票佣金收入',dataIndex:'stock_commission',blank:4},
            {name:'本周_基金佣金收入',dataIndex:'fund_commission',blank:4},
            // {name:'本周_权证佣金收入',dataIndex:'warrant_commission',blank:8},
            // {name:'本周_融资融券佣金收入',dataIndex:'margin_commission',blank:4},
            {name:'本周_融资融券股票佣金收入',dataIndex:'margin_stock_commission',blank:4},
            {name:'本周_融资融券基金佣金收入',dataIndex:'margin_fund_commission',blank:4},
            {name:'本周_融资融券债券佣金收入',dataIndex:'margin_bond_commission',blank:4},
            // {name:'本周_融资融券权证佣金收入',dataIndex:'margin_warrant_commission',blank:8},
        ]
    },
    transaction_table_title_week_child_all_commission:{
        title:'下钻 - 累计_佣金收入(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            // {name:'累计_股基权佣金收入',dataIndex:'all_sfw_commission',blank:4},
            {name:'累计_股票佣金收入',dataIndex:'all_stock_commission',blank:4},
            {name:'累计_基金佣金收入',dataIndex:'all_fund_commission',blank:4},
            // {name:'累计_权证佣金收入',dataIndex:'all_warrant_commission',blank:8},
            // {name:'累计_融资融券佣金收入',dataIndex:'all_margin_commission',blank:4},
            {name:'累计_融资融券股票佣金收入',dataIndex:'all_margin_stock_commission',blank:4},
            {name:'累计_融资融券基金佣金收入',dataIndex:'all_margin_fund_commission',blank:4},
            {name:'累计_融资融券债券佣金收入',dataIndex:'all_margin_bond_commission',blank:4},
            // {name:'累计到当天累计融资融券权证佣金收入',dataIndex:'all_margin_warrant_commission',blank:8},
        ]
    },
    transaction_table_title_week_child_cust_right_avg:{
        title:'下钻 - 本周_日均客户权益(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'本周_日均资金余额',dataIndex:'fund_balance_avg',blank:4},
            {name:'本周_日均证券余额',dataIndex:'stock_balance_avg',blank:4},
            {name:'本周_日均多金融余额',dataIndex:'multi_financial_balance_avg',blank:4},
            {name:'本周_日均两融负债',dataIndex:'margin_debit_avg',blank:4},
            {name:'本周_日均股票质押负债',dataIndex:'pledge_debit_avg',blank:4}
        ]
    },
    transaction_table_title_month_child_trade_amount:{
        title:'下钻 - 本月_交易量(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'本月_股票交易量',dataIndex:'stock_amount',blank:4},
            {name:'本月_股票质押交易量',dataIndex:'pledge_amount',blank:8},
            {name:'本月_基金交易量',dataIndex:'fund_amount',blank:4},
            // {name:'本月_权证交易量',dataIndex:'warrant_amount',blank:4},
            {name:'本月_融资融券股票交易量',dataIndex:'margin_stock_amount',blank:4},
            {name:'本月_融资融券基金交易量',dataIndex:'margin_fund_amount',blank:4},
            {name:'本月_融资融券债券交易量',dataIndex:'margin_bond_amount',blank:4},
            // {name:'本月_融资融券权证交易量',dataIndex:'margin_warrant_amount',blank:4},
            {name:'本月_基金分仓交易量',dataIndex:'fund_division',blank:4}
        ]
    },
    transaction_table_title_month_child_all_trade_amount:{
        title:'下钻 - 累计_交易量(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'累计_股票交易量',dataIndex:'all_stock_amount',blank:4},
            {name:'累计_股票质押交易量',dataIndex:'all_pledge_amount',blank:8},
            {name:'累计_基金交易量',dataIndex:'all_fund_amount',blank:4},
            // {name:'累计_权证交易量',dataIndex:'all_warrant_amount',blank:4},
            {name:'累计_融资融券股票交易量',dataIndex:'all_margin_stock_amount',blank:4},
            {name:'累计_融资融券基金交易量',dataIndex:'all_margin_fund_amount',blank:4},
            {name:'累计_融资融券债券交易量',dataIndex:'all_margin_bond_amount',blank:4},
            // {name:'累计_融资融券权证交易量',dataIndex:'all_margin_warrant_amount',blank:4}
        ]
    },
    transaction_table_title_month_child_commission_adjust:{
        title:'下钻 - 本月_佣金收入(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            // {name:'本月_股基权佣金收入',dataIndex:'sfw_commission',blank:4},
            {name:'本月_股票佣金收入',dataIndex:'stock_commission',blank:4},
            {name:'本月_基金佣金收入',dataIndex:'fund_commission',blank:4},
            // {name:'本月_权证佣金收入',dataIndex:'warrant_commission',blank:8},
            // {name:'本月_融资融券佣金收入',dataIndex:'margin_commission',blank:4},
            {name:'本月_融资融券股票佣金收入',dataIndex:'margin_stock_commission',blank:4},
            {name:'本月_融资融券基金佣金收入',dataIndex:'margin_fund_commission',blank:4},
            {name:'本月_融资融券债券佣金收入',dataIndex:'margin_bond_commission',blank:4},
            // {name:'本月_融资融券权证佣金收入',dataIndex:'margin_warrant_commission',blank:8},
            {name:'本月_手工调整佣金收入',dataIndex:'adjust_commission',blank:4}
        ]
    },
    transaction_table_title_month_child_all_commission_adjust:{
        title:'下钻 - 累计_佣金收入(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            // {name:'累计_股基权佣金收入',dataIndex:'all_sfw_commission',blank:4},
            {name:'累计_股票佣金收入',dataIndex:'all_stock_commission',blank:4},
            {name:'累计_基金佣金收入',dataIndex:'all_fund_commission',blank:4},
            // {name:'累计_权证佣金收入',dataIndex:'all_warrant_commission',blank:8},
            // {name:'累计_融资融券佣金收入',dataIndex:'all_margin_commission',blank:4},
            {name:'累计_融资融券股票佣金收入',dataIndex:'all_margin_stock_commission',blank:4},
            {name:'累计_融资融券基金佣金收入',dataIndex:'all_margin_fund_commission',blank:4},
            {name:'累计_融资融券债券佣金收入',dataIndex:'all_margin_bond_commission',blank:4},
            // {name:'累计_融资融券权证佣金收入',dataIndex:'all_margin_warrant_commission',blank:8},
            {name:'累计_手工调整佣金收入',dataIndex:'all_adjust_commission',blank:4}
        ]
    },
    transaction_table_title_month_child_avg_cust_right:{
        title:'下钻 - 本月_日均客户权益(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'本月_日均资金余额',dataIndex:'avg_fund_balance',blank:4},
            {name:'本月_日均证券余额',dataIndex:'avg_stock_balance',blank:4},
            {name:'本月_日均多金融余额',dataIndex:'avg_multi_financial_balance',blank:4},
            {name:'本月_日均两融负债',dataIndex:'avg_margin_debit',blank:4},
            {name:'本月_日均股票质押负债',dataIndex:'avg_pledge_debit',blank:4}
        ]
    },
    transaction_table_title_month_child_end_cust_right:{
        title:'下钻 - 本月_期末客户权益(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'本月_期末资金余额',dataIndex:'end_fund_balance',blank:4},
            {name:'本月_期末证券余额',dataIndex:'end_stock_balance',blank:4},
            {name:'本月_期末多金融余额',dataIndex:'end_multi_financial_balance',blank:4},
            {name:'本月_期末两融负债',dataIndex:'end_margin_debit',blank:4},
            {name:'本月_期末股票质押负债',dataIndex:'end_pledge_debit',blank:4}
        ]
    },
    transaction_table_title_month_child_cust_right:{
        title:'下钻 - 本月_客户权益(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'本月_资金余额',dataIndex:'fund_balance',blank:4},
            {name:'本月_证券余额',dataIndex:'stock_balance',blank:4},
            {name:'本月_多金融余额',dataIndex:'multi_financial_balance',blank:4},
            {name:'本月_两融负债',dataIndex:'margin_debit',blank:4},
            {name:'本月_股票质押负债',dataIndex:'pledge_debit',blank:4}
        ]
    },
    transaction_table_title_year_child_trade_amount:{
        title:'下钻 - 本年_交易量(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'当年股票交易量',dataIndex:'stock_amount',blank:4},
            {name:'当年股票质押交易量',dataIndex:'pledge_amount',blank:8},
            {name:'当年基金交易量',dataIndex:'fund_amount',blank:4},
            // {name:'当年权证交易量',dataIndex:'warrant_amount',blank:4},

            {name:'当年融资融券股票交易量',dataIndex:'margin_stock_amount',blank:4},
            {name:'当年融资融券基金交易量',dataIndex:'margin_fund_amount',blank:4},
            {name:'当年融资融券债券交易量',dataIndex:'margin_bond_amount',blank:4},
            // {name:'当年融资融券权证交易量',dataIndex:'margin_warrant_amount',blank:4}
        ]
    },
    transaction_table_title_year_child_check_trade_amount_fd:{
        title:'下钻 - 本年_考核交易量(万)(含基金分仓)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},
            {name:'当年考核股票交易量',dataIndex:'check_stock_amount',blank:4},
            {name:'当年考核股票质押交易量',dataIndex:'check_pledge_amount',blank:8},
            {name:'当年考核基金交易量',dataIndex:'check_fund_amount',blank:4},
            // {name:'当年考核权证交易量',dataIndex:'check_warrant_amount',blank:4},

            {name:'当年考核融资融券股票交易量',dataIndex:'check_margin_stock_amount',blank:4},
            {name:'当年考核融资融券基金交易量',dataIndex:'check_margin_fund_amount',blank:4},
            {name:'当年考核融资融券债券交易量',dataIndex:'check_margin_bond_amount',blank:4},
            // {name:'当年考核融资融券权证交易量',dataIndex:'check_margin_warrant_amount',blank:4},
            {name:'当年基金分仓交易量',dataIndex:'fund_division',blank:4}
        ]
    },
    transaction_table_title_year_child_commission_adjust:{
        title:'下钻 - 本年_佣金收入(万)(含手动调整)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},

            // {name:'当年股基权佣金收入',dataIndex:'sfw_commission',blank:4},
            {name:'当年股票佣金收入',dataIndex:'stock_commission',blank:4},
            {name:'当年基金佣金收入',dataIndex:'fund_commission',blank:4},
            // {name:'当年权证佣金收入',dataIndex:'warrant_commission',blank:8},
            // {name:'当年融资融券佣金收入',dataIndex:'margin_commission',blank:4},

            {name:'当年融资融券股票佣金收入',dataIndex:'margin_stock_commission',blank:4},
            {name:'当年融资融券基金佣金收入',dataIndex:'margin_fund_commission',blank:4},
            {name:'当年融资融券债券佣金收入',dataIndex:'margin_bond_commission',blank:4},
            // {name:'当年融资融券权证佣金收入',dataIndex:'margin_warrant_commission',blank:8},
            {name:'当年手工调整佣金收入',dataIndex:'adjust_commission',blank:4}
        ]
    },
    transaction_table_title_year_child_cust_right:{
        title:'下钻 - 本年_客户权益(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},

            {name:'当年资金余额',dataIndex:'fund_balance',blank:4},
            {name:'当年证券余额',dataIndex:'stock_balance',blank:4},
            {name:'当年多金融余额',dataIndex:'multi_financial_balance',blank:4},
            {name:'当年两融负债',dataIndex:'margin_debit',blank:4},
            {name:'当年股票质押负债',dataIndex:'pledge_debit',blank:4}
        ]
    },
    transaction_table_title_year_child_avg_cust_right:{
        title:'下钻 - 本年_日均客户权益(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},

            {name:'当年日均资金余额',dataIndex:'avg_fund_balance',blank:4},
            {name:'当年日均证券余额',dataIndex:'avg_stock_balance',blank:4},
            {name:'当年日均多金融余额',dataIndex:'avg_multi_financial_balance',blank:4},
            {name:'当年日均两融负债',dataIndex:'avg_margin_debit',blank:4},
            {name:'当年日均股票质押负债',dataIndex:'avg_pledge_debit',blank:4}
        ]
    },
    assetchange_table_title_day_child_secu_balance:{
        title:'下钻 - 当日_证券市值(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},

            {name:'当日_持有股票市值',dataIndex:'stock_balance',blank:4},
            {name:'当日_持有红股入账',dataIndex:'bonus_in',blank:8},
            {name:'当日_持有港股通市值',dataIndex:'hk_balance',blank:8},
            {name:'当日_持有深A市值',dataIndex:'sz_a_balance',blank:8},
            {name:'当日_持有深B市值',dataIndex:'sz_b_balance',blank:8},
            {name:'当日_持有沪A市值',dataIndex:'sh_a_balance',blank:8},
            {name:'当日_持有沪B市值',dataIndex:'sh_b_balance',blank:8},
            {name:'当日_持有三板市值',dataIndex:'stb_balance',blank:8},
            {name:'当日_持有创业板市值',dataIndex:'gem_balance',blank:8},

            {name:'当日_持有基金市值',dataIndex:'fund_balance',blank:4},
            {name:'当日_持有上海基金市值',dataIndex:'sh_fund_balance',blank:8},
            {name:'当日持有深圳基金市值',dataIndex:'sz_fund_balance',blank:8},

            {name:'当日_持有债券市值',dataIndex:'bond_balance',blank:4},
        ]
    },
    assetchange_table_title_day_child_assure_asset:{
        title:'下钻 - 当日_担保品资产(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},

            {name:'当日_担保品资产',dataIndex:'assure_asset',blank:4},
            {name:'当日_担保品资金余额',dataIndex:'assure_capital_balance',blank:8},
            {name:'当日_担保品证券市值',dataIndex:'assure_secu_balance',blank:8},
            {name:'当日_两融负债',dataIndex:'margin_debit',blank:4},
        ]
    },
    assetchange_table_title_day_child_asset:{
        title:'下钻 - 当日_资产额(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},

            {name:'当日_资金余额',dataIndex:'capital_balance',blank:4},
            {name:'当日_股票质押负债',dataIndex:'pledge_debit',blank:8},
            {name:'当日_多金融产品市值',dataIndex:'multi_financial_balance',blank:4},
        ]
    },
    assetchange_table_title_day_child_in_secu_balance:{
        title:'下钻 - 当日_转入市值(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},

            {name:'当日_转入限售股市值（万）',dataIndex:'in_limit_sale_balance',blank:4}
        ]
    },
    assetchange_table_title_day_child_out_secu_balance:{
        title:'下钻 - 当日_转出市值(万)',
        data:[
            {name:'分支机构名称',dataIndex:'branch_name',blank:0},

            {name:'当日_转出限售股市值（万）',dataIndex:'out_limit_sale_balance',blank:4}
        ]
    },
    cooperatedevelop_table_title_dev_child_total_amount:{
        title:'下钻 - 本期_交易量',
        data:[
            {name:'客户姓名',dataIndex:'cust_name',blank:0},
            {name:'本期_股票交易量',dataIndex:'stock_amount',blank:0},
            {name:'本期_基金交易量',dataIndex:'fund_amount',blank:0},
            {name:'本期_股基交易量',dataIndex:'sf_amount',blank:0},
            {name:'本期_担保品交易量',dataIndex:'assure_amount',blank:0},
            {name:'本期_信用交易量',dataIndex:'credit_amount',blank:0},
        ]
    },
    cooperatedevelop_table_title_dev_child_total_commission:{
        title:'下钻 - 本期_总佣金',
        data:[
            {name:'客户姓名',dataIndex:'cust_name',blank:0},
            {name:'本期_佣金',dataIndex:'commission',blank:0},
            {name:'本期_信用交易佣金',dataIndex:'credit_commission',blank:0},
            {name:'本期_信用交易净佣金',dataIndex:'credit_net_commission',blank:0},
            {name:'本期_净佣金',dataIndex:'net_commission',blank:0},
            {name:'本期_担保品佣金',dataIndex:'assure_commission',blank:0},
            {name:'本期_担保品净佣金',dataIndex:'assure_net_commission',blank:0},
        ]
    },
    transaction_has_stream_column_name_map:{
        day:['trade_amount','commission','all_commission'],
        week:['trade_amount','all_trade_amount','commission','all_commission','cust_right_avg'],
        month:['trade_amount','all_trade_amount','commission_adjust','all_commission_adjust','avg_cust_right','end_cust_right','cust_right'],
        year:['trade_amount','check_trade_amount_fd','commission_adjust','cust_right','avg_cust_right']
    },
    assetchange_has_stream_column_name_map:{
        day:['secu_balance','assure_asset','asset','in_secu_balance','out_secu_balance'],
        month:[]
    },
    cooperatedevelop_has_stream_column_name_map:{
        dev:['total_amount','total_commission']
    },
    cooperatedevelop_table_title_count_child:[
        {
            field_name:'customer',
            index_id:'001',
            name:'客户',
            key:'1'
        },
        {
            field_name:'effect_date',
            index_id:'002',
            name:'生效日期',
            key:'2'
        },
        {
            field_name:'branch_name',
            index_id:'003',
            name:'开户营业部',
            key:'3'
        },
        {
            field_name:'coop_branch_name',
            index_id:'004',
            name:'合作营业部',
            key:'4'
        },
        {
            field_name:'relation',
            index_id:'005',
            name:'关系',
            key:'5'
        },
        {
            field_name:'coop_fare_ratio',
            index_id:'006',
            name:'合作营业部净佣金比例',
            key:'6'
        },
        {
            field_name:'coop_asset_ratio',
            index_id:'007',
            name:'合作营业部资产比例',
            key:'7'
        },
        {
            field_name:'coop_amount_ratio',
            index_id:'008',
            name:'合作营业部交易量比例',
            key:'8'
        }
    ],
    report_default_page_size:20,
    kpi_top_25_rank_table_title:[
        {
            title: '券商名称',
            dataIndex: 'secu_name',
            key: 'secu_name'
        }, {
            title: '序号',
            dataIndex: 'market_rank',
            key: 'market_rank'
        }, {
            title: '',
            children: [
                {
                    title: '交易额(亿元)',
                    dataIndex: 'secu_amount',
                    key: 'secu_amount'
                }, {
                    title: '交易占比(%)',
                    dataIndex: 'secu_rate',
                    key: 'secu_rate'
                }, {
                    title: '环比(%)',
                    dataIndex: 'secu_rate_mom',
                    key: 'secu_rate_mom'
                }
            ]
        }, {
            title: '',
            children: [
                {
                    title: '交易额(亿元)',
                    dataIndex: 'all_secu_amount',
                    key: 'all_secu_amount'
                }, {
                    title: '交易占比(%)',
                    dataIndex: 'all_secu_rate',
                    key: 'all_secu_rate'
                }, {
                    title: '同比(%)',
                    dataIndex: 'all_secu_rate_yoy',
                    key: 'all_secu_rate_yoy'
                }
            ]
        }
    ],
    month_en_ch_map:{
        '01':'1月',
        '02':'2月',
        '03':'3月',
        '04':'4月',
        '05':'5月',
        '06':'6月',
        '07':'7月',
        '08':'8月',
        '09':'9月',
        '10':'10月',
        '11':'11月',
        '12':'12月',
    }
}

export default CONSTANTS
