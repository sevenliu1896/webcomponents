/*
  @Desc 股票搜索框
*/
import StockSearch from './src/StockSearch';

StockSearch.install = function(vue) {
    Vue.component(StockSearch.name, StockSearch);
}

export default StockSearch;