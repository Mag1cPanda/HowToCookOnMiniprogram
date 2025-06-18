Page({
    data: {
        listData: [], // 列表数据
        page: 1, // 当前页码
        pageSize: 20, // 每页数量
        isRefreshing: false, // 是否正在刷新
        isLoadingMore: false, // 是否正在加载更多
        noMoreData: false // 是否没有更多数据
    },

    onLoad() {
        // 初始化加载数据
        this.loadData();
    },

    // 加载数据
    loadData(isLoadMore = false) {
        if (isLoadMore) {
            if (this.data.noMoreData) return; // 添加这行防止重复加载
            this.setData({
                isLoadingMore: true
            });
        }

        // 模拟网络请求
        setTimeout(() => {
            const newData = this.generateMockData(this.data.page, this.data.pageSize);

            if (isLoadMore) {
                this.setData({
                    listData: [...this.data.listData, ...newData],
                    isLoadingMore: false
                });

                // 模拟数据限制 - 实际项目中根据API返回判断
                if (this.data.page >= 5) {
                    this.setData({
                        noMoreData: true
                    });
                }
            } else {
                this.setData({
                    listData: newData,
                    isRefreshing: false,
                    noMoreData: false
                });
            }
        }, 1000);
    },

    // 生成模拟数据
    generateMockData(page, pageSize) {
        const data = [];
        for (let i = 0; i < pageSize; i++) {
            data.push({
                id: (page - 1) * pageSize + i,
                title: `第${page}页，第${i + 1}条数据`
            });
        }
        return data;
    },

    // 下拉刷新
    onRefresh() {
        this.setData({
            isRefreshing: true,
            page: 1
        });
        this.loadData();
    },

    // 上拉加载更多
    onReachBottom() {
        // debugger
        console.log('onReachBottom');
        if (this.data.isLoadingMore || this.data.noMoreData) return;

        this.setData({
            page: this.data.page + 1
        });
        this.loadData(true);
    }
});