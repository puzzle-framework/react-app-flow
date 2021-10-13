(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{122:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return core.a})),__webpack_require__.d(__webpack_exports__,"b",(function(){return LoggerHelper}));var core=__webpack_require__(169);__webpack_require__(22),__webpack_require__(866),__webpack_require__(10);var LoggerHelper=function LoggerHelper(){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,LoggerHelper)};LoggerHelper._groups={all:!0},LoggerHelper.isGroupActive=function(_ref){var group=_ref.group,type=_ref.type,all=core.a.getPropertyValue(LoggerHelper._groups,"all",!0),allByType=core.a.getPropertyValue(all,type),value=core.a.getPropertyValue(LoggerHelper._groups,group,!0),valueByType=core.a.getPropertyValue(value,type);return console.log("LoggerHelper > isGroupActive",{all:all,allByType:allByType,value:value,valueByType:valueByType}),void 0!==allByType?allByType:void 0!==all&&"boolean"==typeof all?all:void 0!==valueByType?valueByType:value},LoggerHelper.treatLogger=function(type){return function(group){return function(msg){if(LoggerHelper.isGroupActive({group:group,type:type}))try{for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)args[_key-1]=arguments[_key];console[type].apply(msg,[(new Date).toUTCString(),msg].concat(args))}catch(err){if(!LoggerHelper.isGroupActive({group:group,type:"error"}))return;console.error("LoggerHelper > treatLogger",err)}}}},LoggerHelper.init=function(groups){LoggerHelper._groups=Object.assign({},LoggerHelper._groups,groups)},LoggerHelper.error=LoggerHelper.treatLogger("error"),LoggerHelper.log=LoggerHelper.treatLogger("log"),LoggerHelper.warn=LoggerHelper.treatLogger("warn")},144:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return FlowManager}));__webpack_require__(215),__webpack_require__(42),__webpack_require__(20),__webpack_require__(6),__webpack_require__(10),__webpack_require__(214);var react=__webpack_require__(0),react_default=__webpack_require__.n(react),placeholder=__webpack_require__(168),helpers=__webpack_require__(122);var Step=function Step(name,loader,options){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,Step),this.name=void 0,this.url=void 0,this.loader=void 0,this.actions=void 0,this.options=void 0,this.name=name,this.loader=loader,this.actions={},this.options=options},jsx_runtime=__webpack_require__(30);function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}var flow_model_Flow=function(){function Flow(_name){var _this=this;!function flow_model_classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,Flow),this.name=void 0,this.steps=void 0,this.lastSteps=void 0,this.history=void 0,this.watchers=void 0,this.fromFlowName=void 0,this.logger=function(message){for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)args[_key-1]=arguments[_key];console.log("Flow",message,args)},this.callWatchers=function(type,dispatch){var data={lastStepName:_this.lastStepName,currentStepName:_this.currentStepName!==_this.lastStepName?_this.currentStepName:"__function__",type:type,dispatch:dispatch};_this.watchers[type].forEach((function(fn){return fn(data)})),_this.watchers.all.forEach((function(fn){return fn(data)}))},this.addStep=function(screen,name,options){var step=new Step(name,screen.loader,options);_this.steps[name]=step},this.addAction=function(screenName,actionName,gotoScreenName){_this.steps[screenName].actions[actionName]=gotoScreenName},this.addWatcher=function(callback){var type=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"all";_this.watchers[type].push(callback)},this.start=function(stepName,fromFlowName){_this.logger("start",{stepName:stepName,fromFlowName:fromFlowName}),_this.fromFlowName=fromFlowName;var currentStepName=stepName||_this.currentStepName||_this.steps[Object.keys(_this.steps)[0]].name;_this.currentStepName=currentStepName},this.render=function(){var currentStepName=_this.currentStepName||_this.steps[Object.keys(_this.steps)[0]].name;if(_this.logger("Flow > render [start]",{currentStepName:currentStepName}),_this.lastStepName!==_this.currentStepName&&_this.mount(),currentStepName&&_this.steps.hasOwnProperty(currentStepName)){var Screen=_this.steps[currentStepName].loader();return Object(jsx_runtime.jsx)(react_default.a.Suspense,{fallback:Object(jsx_runtime.jsx)(placeholder.a,{loading:!0}),children:Object(jsx_runtime.jsx)(Screen,{})})}return null},this.mount=function(){_this.callWatchers("mount")},this.back=function(){var backStepName=_this.history.pop();return backStepName?(_this.currentStepName=backStepName,_this.callWatchers("back"),{changed:!0}):_this.fromFlowName?{changed:!0,currentFlowName:_this.fromFlowName}:{changed:!1}},this.treatHistory=function(){if(_this.currentStepName){var _currentStep$options,_currentStep$options2,_currentStep$options3,currentStep=_this.steps[_this.currentStepName];_this.logger("Flow > treatHistory",{currentStep:currentStep,ignoreHistory:null===(_currentStep$options=currentStep.options)||void 0===_currentStep$options?void 0:_currentStep$options.ignoreHistory}),helpers.a.getValueOrDefault(null===(_currentStep$options2=currentStep.options)||void 0===_currentStep$options2?void 0:_currentStep$options2.clearHistory,!1)&&(_this.history=[],_this.fromFlowName=void 0),helpers.a.getValueOrDefault(null===(_currentStep$options3=currentStep.options)||void 0===_currentStep$options3?void 0:_currentStep$options3.ignoreHistory,!1)||_this.history.push(_this.currentStepName)}},this.dispatch=function(actionName,payload){_this.logger("Flow > dispatch [start]",{actionName:actionName,payload:payload,flow:_this});var nextStepFnResult,currentStep=_this.currentStepName?_this.steps[_this.currentStepName]:void 0,nextStepNameOrFn=void 0,changed=!1;return null!=currentStep&&currentStep.actions.hasOwnProperty(actionName)&&("string"==typeof(nextStepNameOrFn=currentStep.actions[actionName])?((changed=_this.currentStepName!==nextStepNameOrFn)&&_this.treatHistory(),_this.currentStepName=nextStepNameOrFn):(_this.currentStepName=_this.currentStepName,nextStepFnResult=nextStepNameOrFn(),changed=!0)),changed&&_this.callWatchers("dispatch",{actionName:actionName,payload:payload}),_this.logger("Flow > dispatch [end]",{nextStepNameOrFn:nextStepNameOrFn,changed:changed,flow:_this}),Object.assign({},nextStepFnResult,{changed:changed})},this.name=_name,this.steps={},this.lastSteps={},this.history=[],this.watchers={all:[],back:[],dispatch:[],mount:[]}}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(Flow,[{key:"lastStepName",get:function get(){return this.lastSteps[1]}},{key:"currentStepName",get:function get(){return this.lastSteps[0]},set:function set(value){this.lastSteps[1]=this.lastSteps[0],this.lastSteps[0]=value}}]),Flow}();var FlowManager=function FlowManager(){!function flowManager_model_classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,FlowManager)};FlowManager.flows={},FlowManager.flow=function(name){return console.log("FlowManager > flow [start]",{name:name}),FlowManager.flows.hasOwnProperty(name)||(FlowManager.flows[name]=new flow_model_Flow(name)),console.log("FlowManager > flow [end]",{name:name,flows:FlowManager.flows}),{steps:FlowManager.steps(name)}},FlowManager.getFlow=function(name){return FlowManager.flows[name]},FlowManager.steps=function(flowName){return function(screens,steps){return Object.keys(steps).forEach((function(step){var screen=screens[step];console.log("steps",{screens:screens,screen:screen,step:step}),FlowManager.getFlow(flowName).addStep(screen,step,steps[step])})),console.log("flow",{flow:FlowManager.getFlow(flowName)}),{step:function step(name){screens[name];return function(screenActions){Object.keys(screenActions).forEach((function(action){var gotoScreen=screenActions[action];console.log("steps",{screens:screens,steps:steps,name:name,gotoScreen:gotoScreen,screenActions:screenActions}),FlowManager.getFlow(flowName).addAction(name,action,gotoScreen)})),console.log("flow final",{flow:FlowManager.getFlow(flowName)})}},watch:function watch(input){if("function"==typeof input){var params=input;return FlowManager.getFlow(flowName).addWatcher(params,"all")}var _params=input;return FlowManager.getFlow(flowName).addWatcher(_params.callback,_params.type)}}}}},168:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return placeholder_component_Placeholder}));__webpack_require__(0);var hooks=__webpack_require__(176),jsx_runtime=(__webpack_require__(867),__webpack_require__(30)),placeholder_component_Placeholder=function Placeholder(_ref){var children=_ref.children,loading=_ref.loading;return(0,Object(hooks.c)("components").log)("Placeholder > render",{loading:loading}),Object(jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[loading&&Object(jsx_runtime.jsx)("div",{className:"placeholder-load-wraper",children:Object(jsx_runtime.jsx)("div",{className:"placeholder-activity"})}),!loading&&Object(jsx_runtime.jsx)(jsx_runtime.Fragment,{children:children})]})};try{placeholder_component_Placeholder.displayName="Placeholder",placeholder_component_Placeholder.__docgenInfo={description:"",displayName:"Placeholder",props:{loading:{defaultValue:null,description:"",name:"loading",required:!0,type:{name:"boolean"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/placeholder/placeholder.component.tsx#Placeholder"]={docgenInfo:placeholder_component_Placeholder.__docgenInfo,name:"Placeholder",path:"src/components/placeholder/placeholder.component.tsx#Placeholder"})}catch(__react_docgen_typescript_loader_error){}},169:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return CoreHelper}));var CoreHelper=function CoreHelper(){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,CoreHelper)};CoreHelper.getValueOrDefault=function(value,defaultValue){return void 0===value?defaultValue:value},CoreHelper.getPropertyValue=function(obj,propName,defaultValue){return CoreHelper.getValueOrDefault(obj.hasOwnProperty(propName)?obj[propName]:void 0,defaultValue)}},172:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",(function(){return flowManagerContext})),__webpack_require__.d(__webpack_exports__,"a",(function(){return flow_provider_FlowProvider}));__webpack_require__(6),__webpack_require__(450),__webpack_require__(5),__webpack_require__(8),__webpack_require__(7),__webpack_require__(18),__webpack_require__(14),__webpack_require__(11),__webpack_require__(13),__webpack_require__(15),__webpack_require__(25);var react=__webpack_require__(0),react_default=__webpack_require__.n(react),models=__webpack_require__(144),jsx_runtime=__webpack_require__(30);function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var flowManagerContext=react_default.a.createContext({currentFlowName:"",start:function start(flowName,stepName){console.log("flowManagerContext > start > Not init")},back:function back(){console.log("flowManagerContext > back > Not init")},dispatch:function dispatch(name,payload){console.log("flowManagerContext > dispatch > Not init")}}),flow_provider_FlowProvider=function FlowProvider(_ref){var _flow$current3,_flow$current4,children=_ref.children,_React$useState2=_slicedToArray(react_default.a.useState(0),2),setForceUpdate=(_React$useState2[0],_React$useState2[1]),currentFlowName=react_default.a.useRef(""),flow=react_default.a.useRef(),forceUpdate=react_default.a.useCallback((function(){flow.current=models.a.getFlow(currentFlowName.current),setForceUpdate((function(val){return val+1}))}),[]),handleStart=react_default.a.useCallback((function(flowName,stepName,ignoreFromFlow){console.log("FlowProvider > handleStart",{flowName:flowName});var flow=models.a.getFlow(flowName);null==flow||flow.start(stepName,ignoreFromFlow?void 0:currentFlowName.current),currentFlowName.current=flowName,forceUpdate()}),[forceUpdate]),handleBack=react_default.a.useCallback((function(){var _flow$current,_flow$current$back=null===(_flow$current=flow.current)||void 0===_flow$current?void 0:_flow$current.back(),changed=_flow$current$back.changed,currentFlowName=_flow$current$back.currentFlowName;console.log("FlowProvider > back",{changed:changed,currentFlowName:currentFlowName}),changed&&currentFlowName?handleStart(currentFlowName,void 0,!0):changed&&forceUpdate()}),[forceUpdate,handleStart]),handleDispatch=react_default.a.useCallback((function(name,payload){var _flow$current2,_flow$current$dispatc=null===(_flow$current2=flow.current)||void 0===_flow$current2?void 0:_flow$current2.dispatch(name,payload),changed=_flow$current$dispatc.changed,currentFlowName=_flow$current$dispatc.currentFlowName,currentStepName=_flow$current$dispatc.currentStepName;console.log("FlowProvider > dispatch",{name:name,payload:payload,changed:changed}),currentFlowName?handleStart(currentFlowName,currentStepName):changed&&forceUpdate()}),[forceUpdate,handleStart]);return console.log("FlowProvider",{flow:flow.current}),Object(jsx_runtime.jsxs)(flowManagerContext.Provider,{value:{currentFlowName:null===(_flow$current3=flow.current)||void 0===_flow$current3?void 0:_flow$current3.name,start:handleStart,back:handleBack,dispatch:handleDispatch},children:[children,null===(_flow$current4=flow.current)||void 0===_flow$current4?void 0:_flow$current4.render()]})};flow_provider_FlowProvider.displayName="FlowProvider";try{flow_provider_FlowProvider.displayName="FlowProvider",flow_provider_FlowProvider.__docgenInfo={description:"",displayName:"FlowProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/providers/flow/flow.provider.tsx#FlowProvider"]={docgenInfo:flow_provider_FlowProvider.__docgenInfo,name:"FlowProvider",path:"src/providers/flow/flow.provider.tsx#FlowProvider"})}catch(__react_docgen_typescript_loader_error){}},176:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return useFlow_hook_useFlow})),__webpack_require__.d(__webpack_exports__,"b",(function(){return useFlow_hook_useFlowManager})),__webpack_require__.d(__webpack_exports__,"c",(function(){return useLogger_useLogger}));var react=__webpack_require__(0),react_default=__webpack_require__.n(react),providers=__webpack_require__(172),useFlow_hook_useFlow=function useFlow(screen){var _React$useContext=react_default.a.useContext(providers.b),back=_React$useContext.back,_dispatch=_React$useContext.dispatch;return{back:back,dispatch:function dispatch(name,payload){_dispatch(name,payload)}}},useFlow_hook_useFlowManager=function useFlowManager(){return{start:react_default.a.useContext(providers.b).start}};try{useFlow_hook_useFlow.displayName="useFlow",useFlow_hook_useFlow.__docgenInfo={description:"",displayName:"useFlow",props:{actions:{defaultValue:null,description:"",name:"actions",required:!0,type:{name:"any"}},loader:{defaultValue:null,description:"",name:"loader",required:!0,type:{name:"() => LazyExoticComponent<ComponentType<any>>"}},url:{defaultValue:null,description:"",name:"url",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useFlow/useFlow.hook.tsx#useFlow"]={docgenInfo:useFlow_hook_useFlow.__docgenInfo,name:"useFlow",path:"src/hooks/useFlow/useFlow.hook.tsx#useFlow"})}catch(__react_docgen_typescript_loader_error){}var helpers=__webpack_require__(122),useLogger_useLogger=function useLogger(group){return{error:helpers.b.error(group),log:helpers.b.log(group),warn:helpers.b.error(group)}};try{useLogger_useLogger.displayName="useLogger",useLogger_useLogger.__docgenInfo={description:"",displayName:"useLogger",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useLogger/useLogger.tsx#useLogger"]={docgenInfo:useLogger_useLogger.__docgenInfo,name:"useLogger",path:"src/hooks/useLogger/useLogger.tsx#useLogger"})}catch(__react_docgen_typescript_loader_error){}},232:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return storybookHelper_helper_StorybookHelper}));__webpack_require__(10),__webpack_require__(215),__webpack_require__(42),__webpack_require__(20),__webpack_require__(305),__webpack_require__(214),__webpack_require__(0);var jsx_runtime=__webpack_require__(30);function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}var storybookHelper_helper_StorybookHelper=function(){function StorybookHelper(){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,StorybookHelper)}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(StorybookHelper,null,[{key:"writeStory",value:function writeStory(input){var Component=input.component,args=input.args,_input$group=input.group,group=void 0===_input$group?"General":_input$group,template=function template(props){return Object(jsx_runtime.jsx)(Component,Object.assign({},props))},stories={};return args&&Object.keys(args).forEach((function(elem){stories[elem]=template.bind({}),stories[elem].args=args[elem]})),{meta:{title:group+"/"+Component.displayName,component:Component,decorators:[function(story,context){return story()}]},template:template,stories:stories}}}]),StorybookHelper}()},235:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return screens}));__webpack_require__(57),__webpack_require__(7),__webpack_require__(14),__webpack_require__(11),__webpack_require__(13);var react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__),screens={screen1:{actions:["skip","next"],loader:function loader(){return react__WEBPACK_IMPORTED_MODULE_5___default.a.lazy((function(){return __webpack_require__.e(8).then(__webpack_require__.bind(null,887))}))}},screen2:{actions:["next"],loader:function loader(){return react__WEBPACK_IMPORTED_MODULE_5___default.a.lazy((function(){return __webpack_require__.e(9).then(__webpack_require__.bind(null,888))}))}},screen3:{actions:["end"],loader:function loader(){return react__WEBPACK_IMPORTED_MODULE_5___default.a.lazy((function(){return __webpack_require__.e(10).then(__webpack_require__.bind(null,889))}))}}}},498:function(module,exports,__webpack_require__){__webpack_require__(499),__webpack_require__(659),__webpack_require__(660),__webpack_require__(878),__webpack_require__(874),__webpack_require__(880),__webpack_require__(875),__webpack_require__(881),__webpack_require__(876),__webpack_require__(877),__webpack_require__(882),__webpack_require__(879),__webpack_require__(883),module.exports=__webpack_require__(863)},566:function(module,exports){},660:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(217)},863:function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__(217).configure)([__webpack_require__(864)],module,!1)}).call(this,__webpack_require__(208)(module))},864:function(module,exports,__webpack_require__){var map={"./__stories__/flow.stories.tsx":884,"./components/placeholder/placeholder.stories.tsx":871,"./helpers/core/core.stories.mdx":872};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=864},867:function(module,exports,__webpack_require__){var api=__webpack_require__(868),content=__webpack_require__(869);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},869:function(module,exports,__webpack_require__){(exports=__webpack_require__(870)(!1)).push([module.i,".placeholder-load-wraper {\n\tposition: relative;\n\theight: 100%;\n\twidth: 100%;\n\tbackground-color: rgb(211, 211, 211);\n\tz-index: 44;\n\toverflow: hidden;\n\tborder-radius: 5px;\n}\n.placeholder-activity {\n\tposition: absolute;\n\tleft: -45%;\n\theight: 100%;\n\twidth: 45%;\n\tbackground-image: linear-gradient(\n\t\tto left,\n\t\trgba(251, 251, 251, 0.05),\n\t\trgba(251, 251, 251, 0.3),\n\t\trgba(251, 251, 251, 0.6),\n\t\trgba(251, 251, 251, 0.3),\n\t\trgba(251, 251, 251, 0.05)\n\t);\n\tbackground-image: -webkit-linear-gradient(\n\t\tto left,\n\t\trgba(251, 251, 251, 0.05),\n\t\trgba(251, 251, 251, 0.3),\n\t\trgba(251, 251, 251, 0.6),\n\t\trgba(251, 251, 251, 0.3),\n\t\trgba(251, 251, 251, 0.05)\n\t);\n\t-webkit-animation: placeholder-loading 1s infinite;\n\t        animation: placeholder-loading 1s infinite;\n\tz-index: 45;\n}\n\n@-webkit-keyframes placeholder-loading {\n\t0% {\n\t\tleft: -45%;\n\t}\n\t100% {\n\t\tleft: 100%;\n\t}\n}\n\n@keyframes placeholder-loading {\n\t0% {\n\t\tleft: -45%;\n\t}\n\t100% {\n\t\tleft: 100%;\n\t}\n}\n",""]),module.exports=exports},871:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Loading",(function(){return Loading})),__webpack_require__.d(__webpack_exports__,"Loaded",(function(){return Loaded}));__webpack_require__(10),__webpack_require__(305),__webpack_require__(0);var ___WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(168),_sb__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(232),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(30),story=_sb__WEBPACK_IMPORTED_MODULE_4__.a.writeStory({component:___WEBPACK_IMPORTED_MODULE_3__.a,group:"Components"});__webpack_exports__.default=story.meta;var template=function template(props){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:{height:"50px"},children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(___WEBPACK_IMPORTED_MODULE_3__.a,Object.assign({},props))})};template.displayName="template";var Loading=template.bind({});Loading.args={children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h1",{children:"Placeholder example"}),loading:!0};var Loaded=template.bind({});Loaded.args={children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h1",{children:"Placeholder example"}),loading:!1},Loading.parameters=Object.assign({storySource:{source:"props => (\n\t<div style={{ height: '50px' }}>\n\t\t<Placeholder {...props} />\n\t</div>\n)"}},Loading.parameters),Loaded.parameters=Object.assign({storySource:{source:"props => (\n\t<div style={{ height: '50px' }}>\n\t\t<Placeholder {...props} />\n\t</div>\n)"}},Loaded.parameters)},872:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"__page",(function(){return __page}));__webpack_require__(20),__webpack_require__(873),__webpack_require__(5),__webpack_require__(10),__webpack_require__(0);var _mdx_js_react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(41),_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(231),___WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(169),_excluded=["components"];function _extends(){return _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}var layoutProps={};function MDXContent(_ref){var components=_ref.components,props=_objectWithoutProperties(_ref,_excluded);return Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("wrapper",_extends({},layoutProps,props,{components:components,mdxType:"MDXLayout"}),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_6__.b,{title:"Helpers/Core",component:___WEBPACK_IMPORTED_MODULE_7__.a,mdxType:"Meta"}),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("h1",{id:"corehelper"},"CoreHelper"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("p",null,"This helpers expose some utilities methods, described below:"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("h2",{id:"getvalueordefault"},"getValueOrDefault"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("p",null,"Return the value or when value is undefined return default value passed"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("h4",{id:"example"},"Example"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("code",{parentName:"pre"},"const res = CoreHelper.getValueOrDefault(undefined, 'defaultValue'); // res='defaultValue'\nconst res = CoreHelper.getValueOrDefault('example', 'defaultValue'); // res='example'\n")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("h2",{id:"getpropertyvalue"},"getPropertyValue"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("p",null,"Return the value of property name of an object"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("h4",{id:"example-1"},"Example"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)("code",{parentName:"pre"},"const res = CoreHelper.getPropertyValue({a: 1, b: 2}, 'a'); // res=1\nconst res = CoreHelper.getPropertyValue({a: 1, b: 2}, 'c'); // res=undefined\nconst res = CoreHelper.getPropertyValue({a: 1, b: 2}, 'c', 3); // res=3\n")))}MDXContent.displayName="MDXContent",MDXContent.isMDXComponent=!0;var __page=function __page(){throw new Error("Docs-only story")};__page.parameters={docsOnly:!0};var componentMeta={title:"Helpers/Core",component:___WEBPACK_IMPORTED_MODULE_7__.a,includeStories:["__page"]},mdxStoryNameToKey={};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs=Object.assign({},componentMeta.parameters.docs||{},{page:function page(){return Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_6__.a,{mdxStoryNameToKey:mdxStoryNameToKey,mdxComponentMeta:componentMeta},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__.b)(MDXContent,null))}}),__webpack_exports__.default=componentMeta},883:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var preview_namespaceObject={};__webpack_require__.r(preview_namespaceObject),__webpack_require__.d(preview_namespaceObject,"globalTypes",(function(){return globalTypes}));__webpack_require__(20),__webpack_require__(5),__webpack_require__(51),__webpack_require__(442),__webpack_require__(215),__webpack_require__(42),__webpack_require__(855),__webpack_require__(856),__webpack_require__(214);var client_api=__webpack_require__(894),esm=__webpack_require__(4),blocks=(__webpack_require__(450),__webpack_require__(8),__webpack_require__(7),__webpack_require__(18),__webpack_require__(14),__webpack_require__(11),__webpack_require__(13),__webpack_require__(15),__webpack_require__(6),__webpack_require__(25),__webpack_require__(311)),preview=__webpack_require__(478),client=__webpack_require__(217),anysort=__webpack_require__(477),anysort_default=__webpack_require__.n(anysort);function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}Object(client.addParameters)({docs:{container:blocks.a,page:blocks.b},viewport:{viewports:preview.a,defaultViewport:"iphone6"},options:{showRoots:!0,storySort:function storySort(previous,next){var _previous=_slicedToArray(previous,2),previousMeta=(_previous[0],_previous[1]),_next=_slicedToArray(next,2),nextMeta=(_next[0],_next[1]);return anysort_default()(previousMeta.kind,nextMeta.kind,["Overview/Introduction","Overview/Getting Started","Overview/Themes","Overview/**","Components/**"])}},actions:{argTypesRegex:"^on[A-Z].*"}});var globalTypes={language:{name:"Language",description:"Change the language of component preview",defaultValue:"pt",toolbar:{icon:"globe",items:[{value:"pt",title:"PT - Portuguese"},{value:"en",title:"EN - English"}]}},platform:{name:"Platform",description:"Change the platform of component preview",defaultValue:"mobile",toolbar:{icon:"browser",items:[{value:"mobile",title:"Mobile - App and browser mobile devices"},{value:"desktop",title:"Desktop - Tablets and PC devices"}]}}};function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.keys(preview_namespaceObject).forEach((function(key){var value=preview_namespaceObject[key];switch(key){case"args":case"argTypes":return esm.a.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify(value));case"decorators":return value.forEach((function(decorator){return Object(client_api.c)(decorator,!1)}));case"loaders":return value.forEach((function(loader){return Object(client_api.d)(loader,!1)}));case"parameters":return Object(client_api.e)(function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},value),!1);case"argTypesEnhancers":return value.forEach((function(enhancer){return Object(client_api.a)(enhancer)}));case"argsEnhancers":return value.forEach((function(enhancer){return Object(client_api.b)(enhancer)}));case"render":return Object(client_api.g)(value);case"globals":case"globalTypes":var v={};return v[key]=value,Object(client_api.e)(v,!1);default:return console.log(key+" was not supported :( !")}}))},884:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Default",(function(){return Default}));__webpack_require__(305),__webpack_require__(10);var react=__webpack_require__(0),react_default=__webpack_require__.n(react),storybook=__webpack_require__(232),providers=__webpack_require__(172),models=__webpack_require__(144),screens=__webpack_require__(235),f0=models.a.flow("f0").steps(screens.a,{screen1:{},screen2:{ignoreHistory:!0},screen3:{}});f0.step("screen1")({next:"screen2",skip:"screen3"}),f0.step("screen2")({next:"screen3"}),f0.step("screen3")({end:"screen1"});var f1=models.a.flow("f1").steps(screens.a,{screen2:{},screen3:{}});f1.step("screen2")({next:"screen3"}),f1.step("screen3")({end:function end(){return alert("Final step"),{currentFlowName:"f0",currentStepName:"screen2"}}}),f0.watch({callback:function callback(input){console.log("watch back",{input:input})},type:"back"}),f0.watch({callback:function callback(input){console.log("watch dispatch",{input:input})},type:"dispatch"}),f0.watch({callback:function callback(input){console.log("watch mount",{input:input})},type:"mount"});var hooks=__webpack_require__(176),jsx_runtime=__webpack_require__(30),flow_stories_FlowExample=function FlowExample(){var start=Object(hooks.b)().start;return react_default.a.useEffect((function(){start("f1")}),[start]),Object(jsx_runtime.jsx)(jsx_runtime.Fragment,{})},flow_stories_Flow=function Flow(){return Object(jsx_runtime.jsx)(flow_stories_FlowExample,{})};flow_stories_Flow.displayName="Flow";var story=storybook.a.writeStory({component:flow_stories_Flow,group:"Modules"}),flow_stories_template=(__webpack_exports__.default=story.meta,function template(){return Object(jsx_runtime.jsx)(providers.a,{children:Object(jsx_runtime.jsx)(flow_stories_FlowExample,{})})});flow_stories_template.displayName="template";var Default=flow_stories_template.bind({});Default.args={children:Object(jsx_runtime.jsx)("h1",{children:"Flow example"})},Default.parameters=Object.assign({storySource:{source:"() => (\n\t<FlowProvider>\n\t\t<FlowExample />\n\t</FlowProvider>\n)"}},Default.parameters)}},[[498,2,3]]]);