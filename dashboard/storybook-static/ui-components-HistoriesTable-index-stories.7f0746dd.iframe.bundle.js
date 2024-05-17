"use strict";(self.webpackChunkdashboard=self.webpackChunkdashboard||[]).push([[7521],{"./app/ui/components/HistoriesTable/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var react=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/index.js"),chunk_PULVB27S=__webpack_require__("./node_modules/.pnpm/@chakra-ui+layout@2.3.1_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs"),chunk_MGVPL3OH=__webpack_require__("./node_modules/.pnpm/@chakra-ui+table@2.1.0_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/table/dist/chunk-MGVPL3OH.mjs"),chunk_T2WCTPDH=__webpack_require__("./node_modules/.pnpm/@chakra-ui+table@2.1.0_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/table/dist/chunk-T2WCTPDH.mjs"),chunk_2OOHT3W5=__webpack_require__("./node_modules/.pnpm/@chakra-ui+layout@2.3.1_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs"),components=__webpack_require__("./app/ui/components/index.ts"),constants=__webpack_require__("./app/lib/constants/index.ts"),notification=__webpack_require__("./app/lib/constants/notification.ts"),hooks=__webpack_require__("./app/lib/hooks/index.ts"),utils=__webpack_require__("./app/lib/utils/index.ts"),__jsx=react.createElement,HistoriesTableComponent=function HistoriesTableComponent(){var _get,_get2,_useSearch=(0,hooks.Rx)(),get=_useSearch.get,setSearchTransaction=_useSearch.setSearchParam,_useState=(0,react.useState)(""),filter=_useState[0],setFilter=_useState[1],_useTransactions=(0,hooks.nC)({name:(null===(_get=get("keyword"))||void 0===_get?void 0:_get.toLowerCase())||""}),dataHistory=_useTransactions.dataHistory,isLoadingTransactions=_useTransactions.isLoading,isTransactionsError=_useTransactions.isError,sortBy=_useTransactions.sortBy,transactionsMemorized=(0,react.useMemo)((function(){return dataHistory.filter((function(_ref){var createdAt=_ref.createdAt;return new Date(createdAt).toLocaleString("default",{month:"short"}).toLowerCase().includes(filter.trim())}))}),[filter,dataHistory]),_usePagination=(0,hooks.h0)(transactionsMemorized),data=_usePagination.data,filterData=_usePagination.filterData,arrOfCurrButtons=_usePagination.arrOfCurrButtons,isDisabledPrev=_usePagination.isDisabledPrev,isDisableNext=_usePagination.isDisableNext,resetPage=_usePagination.resetPage,handleChangeLimit=_usePagination.handleChangeLimit,handlePageChange=_usePagination.handlePageChange,handlePageClick=_usePagination.handlePageClick,_ref2=data||{},_ref2$limit=_ref2.limit,limit=void 0===_ref2$limit?constants.IV:_ref2$limit,_ref2$currentPage=_ref2.currentPage,currentPage=void 0===_ref2$currentPage?1:_ref2$currentPage,handleDebounceSearch=(0,hooks.Nr)((function(value){resetPage(),setSearchTransaction("keyword",value)}),[]),renderHead=(0,react.useCallback)((function(title,key){return title?__jsx(components.lS,{key:title,title,onClick:function handleClick(){sortBy&&sortBy(key)}}):__jsx(chunk_MGVPL3OH.Th,{w:50,maxW:50})}),[sortBy]),renderNameUser=(0,react.useCallback)((function(_ref3){var id=_ref3.id,image=_ref3.image,name=_ref3.name;return __jsx(components.ne,{id,key:id,image,name})}),[]),renderPaymentStatus=(0,react.useCallback)((function(_ref4){var paymentStatus=_ref4.paymentStatus;return __jsx(components.gE,{variant:constants.e3["".concat(paymentStatus)],text:paymentStatus})}),[]),renderTransactionStatus=(0,react.useCallback)((function(_ref5){var transactionStatus=_ref5.transactionStatus;return __jsx(components.gE,{variant:constants.e3["".concat(transactionStatus)],text:transactionStatus})}),[]),renderSpent=(0,react.useCallback)((function(_ref6){var amount=_ref6.amount,isSendMoney=_ref6.type===notification.w.SEND_MONEY;return __jsx(chunk_T2WCTPDH.Td,{py:5,pr:5,pl:0,fontSize:"md",color:"text.primary",fontWeight:"semibold",textAlign:"left",w:{base:150,md:20}},__jsx(chunk_2OOHT3W5.x,{fontSize:"md",fontWeight:"semibold",whiteSpace:"break-spaces",color:isSendMoney?"red.600":"text.currencyColor",noOfLines:1,w:{base:100,md:150,"3xl":200,"5xl":110,"7xl":200},flex:1},amount))}),[]),columns=(0,react.useMemo)((function(){return(0,constants.xm)(renderHead,renderNameUser,renderPaymentStatus,renderTransactionStatus,renderSpent)}),[renderHead,renderNameUser,renderPaymentStatus,renderSpent,renderTransactionStatus]);return __jsx(react.Fragment,null,__jsx(components.E1,{filterOptions:constants.Rw,searchValue:(null===(_get2=get("keyword"))||void 0===_get2?void 0:_get2.toLowerCase())||"",onSearch:handleDebounceSearch,onFilter:setFilter}),__jsx(components.W9,{quality:15,isLoading:isLoadingTransactions,isError:isTransactionsError},__jsx(chunk_PULVB27S.xu,{mt:5},__jsx(components.iA,{columns,dataSource:(0,utils.wb)(filterData)}))),__jsx(components.tl,{pageSize:limit,currentPage,isDisabledPrev,isDisableNext,arrOfCurrButtons,onLimitChange:handleChangeLimit,onPageChange:handlePageChange,onClickPage:handlePageClick}))};const components_HistoriesTable=(0,react.memo)(HistoriesTableComponent);var queryClient=__webpack_require__("./node_modules/.pnpm/@tanstack+query-core@5.17.1/node_modules/@tanstack/query-core/build/modern/queryClient.js"),QueryClientProvider=__webpack_require__("./node_modules/.pnpm/@tanstack+react-query@5.17.1_react@18.2.0/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js"),index_stories_jsx=react.createElement,index_stories_queryClient=new queryClient.S;const index_stories={title:"Custom Components/HistoriesTable",tags:["autodocs"],component:components_HistoriesTable,decorators:[function(Story){return index_stories_jsx(QueryClientProvider.aH,{client:index_stories_queryClient},index_stories_jsx(chunk_PULVB27S.xu,{bgColor:"background.component.primary",borderRadius:8,px:6,py:5},index_stories_jsx(Story,null)))}],parameters:{controls:{expanded:!0}}};var Default={args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]}}]);