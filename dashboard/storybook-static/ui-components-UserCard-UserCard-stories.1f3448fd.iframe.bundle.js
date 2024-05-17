"use strict";(self.webpackChunkdashboard=self.webpackChunkdashboard||[]).push([[8745],{"./node_modules/.pnpm/@chakra-ui+avatar@2.3.0_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/avatar/dist/chunk-V7PAE35Z.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{q:()=>Avatar});var dist=__webpack_require__("./node_modules/.pnpm/@chakra-ui+react-context@2.1.0_react@18.2.0/node_modules/@chakra-ui/react-context/dist/index.mjs"),[AvatarStylesProvider,useAvatarStyles]=(0,dist.k)({name:"AvatarStylesContext",hookName:"useAvatarStyles",providerName:"<Avatar/>"}),chunk_ZHQNHOQS=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZHQNHOQS.mjs"),jsx_runtime=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js");function initials(name){var _a;const names=name.split(" "),firstName=null!=(_a=names[0])?_a:"",lastName=names.length>1?names[names.length-1]:"";return firstName&&lastName?`${firstName.charAt(0)}${lastName.charAt(0)}`:firstName.charAt(0)}function AvatarName(props){const{name,getInitials,...rest}=props,styles=useAvatarStyles();return(0,jsx_runtime.jsx)(chunk_ZHQNHOQS.m.div,{role:"img","aria-label":name,...rest,__css:styles.label,children:name?null==getInitials?void 0:getInitials(name):null})}AvatarName.displayName="AvatarName";var GenericAvatarIcon=props=>(0,jsx_runtime.jsxs)(chunk_ZHQNHOQS.m.svg,{viewBox:"0 0 128 128",color:"#fff",width:"100%",height:"100%",className:"chakra-avatar__svg",...props,children:[(0,jsx_runtime.jsx)("path",{fill:"currentColor",d:"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"}),(0,jsx_runtime.jsx)("path",{fill:"currentColor",d:"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"})]}),chunk_SPIKMR6I=__webpack_require__("./node_modules/.pnpm/@chakra-ui+image@2.1.0_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/image/dist/chunk-SPIKMR6I.mjs"),react=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/index.js");function AvatarImage(props){const{src,srcSet,onError,onLoad,getInitials,name,borderRadius,loading,iconLabel,icon=(0,jsx_runtime.jsx)(GenericAvatarIcon,{}),ignoreFallback,referrerPolicy,crossOrigin}=props,status=(0,chunk_SPIKMR6I.d)({src,onError,crossOrigin,ignoreFallback});return!src||!("loaded"===status)?name?(0,jsx_runtime.jsx)(AvatarName,{className:"chakra-avatar__initials",getInitials,name}):(0,react.cloneElement)(icon,{role:"img","aria-label":iconLabel}):(0,jsx_runtime.jsx)(chunk_ZHQNHOQS.m.img,{src,srcSet,alt:name,onLoad,referrerPolicy,crossOrigin:null!=crossOrigin?crossOrigin:void 0,className:"chakra-avatar__img",loading,__css:{width:"100%",height:"100%",objectFit:"cover",borderRadius}})}AvatarImage.displayName="AvatarImage";var chunk_ZJJGQIVY=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZJJGQIVY.mjs"),chunk_DMO4EI7P=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-DMO4EI7P.mjs"),styled_system_dist=__webpack_require__("./node_modules/.pnpm/@chakra-ui+styled-system@2.9.2/node_modules/@chakra-ui/styled-system/dist/index.mjs"),shared_utils_dist=__webpack_require__("./node_modules/.pnpm/@chakra-ui+shared-utils@2.0.5/node_modules/@chakra-ui/shared-utils/dist/index.mjs"),baseStyle={display:"inline-flex",alignItems:"center",justifyContent:"center",textAlign:"center",textTransform:"uppercase",fontWeight:"medium",position:"relative",flexShrink:0},Avatar=(0,chunk_ZJJGQIVY.G)(((props,ref)=>{const styles=(0,chunk_DMO4EI7P.jC)("Avatar",props),[isLoaded,setIsLoaded]=(0,react.useState)(!1),{src,srcSet,name,showBorder,borderRadius="full",onError,onLoad:onLoadProp,getInitials=initials,icon=(0,jsx_runtime.jsx)(GenericAvatarIcon,{}),iconLabel=" avatar",loading,children,borderColor,ignoreFallback,crossOrigin,referrerPolicy,...rest}=(0,styled_system_dist.Lr)(props),avatarStyles={borderRadius,borderWidth:showBorder?"2px":void 0,...baseStyle,...styles.container};return borderColor&&(avatarStyles.borderColor=borderColor),(0,jsx_runtime.jsx)(chunk_ZHQNHOQS.m.span,{ref,...rest,className:(0,shared_utils_dist.cx)("chakra-avatar",props.className),"data-loaded":(0,shared_utils_dist.PB)(isLoaded),__css:avatarStyles,children:(0,jsx_runtime.jsxs)(AvatarStylesProvider,{value:styles,children:[(0,jsx_runtime.jsx)(AvatarImage,{src,srcSet,loading,onLoad:(0,shared_utils_dist.v0)(onLoadProp,(()=>{setIsLoaded(!0)})),onError,getInitials,name,borderRadius,icon,iconLabel,ignoreFallback,crossOrigin,referrerPolicy}),children]})})}));Avatar.displayName="Avatar"},"./node_modules/.pnpm/@chakra-ui+button@2.1.0_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/button/dist/chunk-6QYXN73V.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>IconButton});var _chunk_UVUR7MCU_mjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+button@2.1.0_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs"),_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZJJGQIVY.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js"),IconButton=(0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__.G)(((props,ref)=>{const{icon,children,isRound,"aria-label":ariaLabel,...rest}=props,element=icon||children,_children=(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(element)?(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(element,{"aria-hidden":!0,focusable:!1}):null;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chunk_UVUR7MCU_mjs__WEBPACK_IMPORTED_MODULE_3__.z,{padding:"0",borderRadius:isRound?"full":void 0,ref,"aria-label":ariaLabel,...rest,children:_children})}));IconButton.displayName="IconButton"},"./node_modules/.pnpm/@chakra-ui+button@2.1.0_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>Button});var react=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/index.js");var dist=__webpack_require__("./node_modules/.pnpm/@chakra-ui+react-context@2.1.0_react@18.2.0/node_modules/@chakra-ui/react-context/dist/index.mjs"),[ButtonGroupProvider,useButtonGroup]=(0,dist.k)({strict:!1,name:"ButtonGroupContext"}),chunk_ZHQNHOQS=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZHQNHOQS.mjs"),shared_utils_dist=__webpack_require__("./node_modules/.pnpm/@chakra-ui+shared-utils@2.0.5/node_modules/@chakra-ui/shared-utils/dist/index.mjs"),jsx_runtime=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js");function ButtonIcon(props){const{children,className,...rest}=props,_children=(0,react.isValidElement)(children)?(0,react.cloneElement)(children,{"aria-hidden":!0,focusable:!1}):children,_className=(0,shared_utils_dist.cx)("chakra-button__icon",className);return(0,jsx_runtime.jsx)(chunk_ZHQNHOQS.m.span,{display:"inline-flex",alignSelf:"center",flexShrink:0,...rest,className:_className,children:_children})}ButtonIcon.displayName="ButtonIcon";var chunk_5PH6ULNP=__webpack_require__("./node_modules/.pnpm/@chakra-ui+spinner@2.1.0_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/spinner/dist/chunk-5PH6ULNP.mjs");function ButtonSpinner(props){const{label,placement,spacing="0.5rem",children=(0,jsx_runtime.jsx)(chunk_5PH6ULNP.$,{color:"currentColor",width:"1em",height:"1em"}),className,__css,...rest}=props,_className=(0,shared_utils_dist.cx)("chakra-button__spinner",className),marginProp="start"===placement?"marginEnd":"marginStart",spinnerStyles=(0,react.useMemo)((()=>({display:"flex",alignItems:"center",position:label?"relative":"absolute",[marginProp]:label?spacing:0,fontSize:"1em",lineHeight:"normal",...__css})),[__css,label,marginProp,spacing]);return(0,jsx_runtime.jsx)(chunk_ZHQNHOQS.m.div,{className:_className,...rest,__css:spinnerStyles,children})}ButtonSpinner.displayName="ButtonSpinner";var react_use_merge_refs_dist=__webpack_require__("./node_modules/.pnpm/@chakra-ui+react-use-merge-refs@2.1.0_react@18.2.0/node_modules/@chakra-ui/react-use-merge-refs/dist/index.mjs"),chunk_ZJJGQIVY=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZJJGQIVY.mjs"),chunk_DMO4EI7P=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-DMO4EI7P.mjs"),styled_system_dist=__webpack_require__("./node_modules/.pnpm/@chakra-ui+styled-system@2.9.2/node_modules/@chakra-ui/styled-system/dist/index.mjs"),Button=(0,chunk_ZJJGQIVY.G)(((props,ref)=>{const group=useButtonGroup(),styles=(0,chunk_DMO4EI7P.mq)("Button",{...group,...props}),{isDisabled=null==group?void 0:group.isDisabled,isLoading,isActive,children,leftIcon,rightIcon,loadingText,iconSpacing="0.5rem",type,spinner,spinnerPlacement="start",className,as,...rest}=(0,styled_system_dist.Lr)(props),buttonStyles=(0,react.useMemo)((()=>{const _focus={...null==styles?void 0:styles._focus,zIndex:1};return{display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none",...styles,...!!group&&{_focus}}}),[styles,group]),{ref:_ref,type:defaultType}=function useButtonType(value){const[isButton,setIsButton]=(0,react.useState)(!value);return{ref:(0,react.useCallback)((node=>{node&&setIsButton("BUTTON"===node.tagName)}),[]),type:isButton?"button":void 0}}(as),contentProps={rightIcon,leftIcon,iconSpacing,children};return(0,jsx_runtime.jsxs)(chunk_ZHQNHOQS.m.button,{ref:(0,react_use_merge_refs_dist.qq)(ref,_ref),as,type:null!=type?type:defaultType,"data-active":(0,shared_utils_dist.PB)(isActive),"data-loading":(0,shared_utils_dist.PB)(isLoading),__css:buttonStyles,className:(0,shared_utils_dist.cx)("chakra-button",className),...rest,disabled:isDisabled||isLoading,children:[isLoading&&"start"===spinnerPlacement&&(0,jsx_runtime.jsx)(ButtonSpinner,{className:"chakra-button__spinner--start",label:loadingText,placement:"start",spacing:iconSpacing,children:spinner}),isLoading?loadingText||(0,jsx_runtime.jsx)(chunk_ZHQNHOQS.m.span,{opacity:0,children:(0,jsx_runtime.jsx)(ButtonContent,{...contentProps})}):(0,jsx_runtime.jsx)(ButtonContent,{...contentProps}),isLoading&&"end"===spinnerPlacement&&(0,jsx_runtime.jsx)(ButtonSpinner,{className:"chakra-button__spinner--end",label:loadingText,placement:"end",spacing:iconSpacing,children:spinner})]})}));function ButtonContent(props){const{leftIcon,rightIcon,children,iconSpacing}=props;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[leftIcon&&(0,jsx_runtime.jsx)(ButtonIcon,{marginEnd:iconSpacing,children:leftIcon}),children,rightIcon&&(0,jsx_runtime.jsx)(ButtonIcon,{marginStart:iconSpacing,children:rightIcon})]})}Button.displayName="Button"},"./node_modules/.pnpm/@chakra-ui+image@2.1.0_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/image/dist/chunk-SPIKMR6I.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useImage,z:()=>shouldShowFallbackImage});var _chakra_ui_react_use_safe_layout_effect__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+react-use-safe-layout-effect@2.1.0_react@18.2.0/node_modules/@chakra-ui/react-use-safe-layout-effect/dist/index.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/index.js");function useImage(props){const{loading,src,srcSet,onLoad,onError,crossOrigin,sizes,ignoreFallback}=props,[status,setStatus]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("pending");(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{setStatus(src?"loading":"pending")}),[src]);const imageRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),load=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{if(!src)return;flush();const img=new Image;img.src=src,crossOrigin&&(img.crossOrigin=crossOrigin),srcSet&&(img.srcset=srcSet),sizes&&(img.sizes=sizes),loading&&(img.loading=loading),img.onload=event=>{flush(),setStatus("loaded"),null==onLoad||onLoad(event)},img.onerror=error=>{flush(),setStatus("failed"),null==onError||onError(error)},imageRef.current=img}),[src,crossOrigin,srcSet,sizes,onLoad,onError,loading]),flush=()=>{imageRef.current&&(imageRef.current.onload=null,imageRef.current.onerror=null,imageRef.current=null)};return(0,_chakra_ui_react_use_safe_layout_effect__WEBPACK_IMPORTED_MODULE_1__.G)((()=>{if(!ignoreFallback)return"loading"===status&&load(),()=>{flush()}}),[status,load,ignoreFallback]),ignoreFallback?"loaded":status}var shouldShowFallbackImage=(status,fallbackStrategy)=>"loaded"!==status&&"beforeLoadOrError"===fallbackStrategy||"failed"===status&&"onError"===fallbackStrategy},"./node_modules/.pnpm/@chakra-ui+layout@2.3.1_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{x:()=>Text});var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZJJGQIVY.mjs"),_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-DMO4EI7P.mjs"),_chakra_ui_system__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+styled-system@2.9.2/node_modules/@chakra-ui/styled-system/dist/index.mjs"),_chakra_ui_system__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZHQNHOQS.mjs"),_chakra_ui_shared_utils__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+shared-utils@2.0.5/node_modules/@chakra-ui/shared-utils/dist/index.mjs"),_chakra_ui_object_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+object-utils@2.1.0/node_modules/@chakra-ui/object-utils/dist/chunk-R3DH46PF.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js"),Text=(0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_1__.G)((function Text2(props,ref){const styles=(0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__.mq)("Text",props),{className,align,decoration,casing,...rest}=(0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_3__.Lr)(props),aliasedProps=(0,_chakra_ui_object_utils__WEBPACK_IMPORTED_MODULE_4__.o)({textAlign:props.align,textDecoration:props.decoration,textTransform:props.casing});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_system__WEBPACK_IMPORTED_MODULE_5__.m.p,{ref,className:(0,_chakra_ui_shared_utils__WEBPACK_IMPORTED_MODULE_6__.cx)("chakra-text",props.className),...aliasedProps,...rest,__css:styles})}));Text.displayName="Text"},"./node_modules/.pnpm/@chakra-ui+layout@2.3.1_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/layout/dist/chunk-7OLJDQMT.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>Heading});var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZJJGQIVY.mjs"),_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-DMO4EI7P.mjs"),_chakra_ui_system__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+styled-system@2.9.2/node_modules/@chakra-ui/styled-system/dist/index.mjs"),_chakra_ui_system__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZHQNHOQS.mjs"),_chakra_ui_shared_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+shared-utils@2.0.5/node_modules/@chakra-ui/shared-utils/dist/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js"),Heading=(0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_1__.G)((function Heading2(props,ref){const styles=(0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__.mq)("Heading",props),{className,...rest}=(0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_3__.Lr)(props);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_system__WEBPACK_IMPORTED_MODULE_4__.m.h2,{ref,className:(0,_chakra_ui_shared_utils__WEBPACK_IMPORTED_MODULE_5__.cx)("chakra-heading",props.className),...rest,__css:styles})}));Heading.displayName="Heading"},"./node_modules/.pnpm/@chakra-ui+layout@2.3.1_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>Flex});var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZJJGQIVY.mjs"),_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZHQNHOQS.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js"),Flex=(0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_1__.G)((function Flex2(props,ref){const{direction,align,justify,wrap,basis,grow,shrink,...rest}=props,styles={display:"flex",flexDirection:direction,alignItems:align,justifyContent:justify,flexWrap:wrap,flexBasis:basis,flexGrow:grow,flexShrink:shrink};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__.m.div,{ref,__css:styles,...rest})}));Flex.displayName="Flex"},"./node_modules/.pnpm/@chakra-ui+layout@2.3.1_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{xu:()=>Box});var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZHQNHOQS.mjs"),_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+system@2.6.2_@emotion+react@11.11.3_@emotion+styled@11.11.0_react@18.2.0/node_modules/@chakra-ui/system/dist/chunk-ZJJGQIVY.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js"),Box=(0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_1__.m)("div");Box.displayName="Box";var Square=(0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__.G)((function Square2(props,ref){const{size,centerContent=!0,...rest}=props,styles=centerContent?{display:"flex",alignItems:"center",justifyContent:"center"}:{};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Box,{ref,boxSize:size,__css:{...styles,flexShrink:0,flexGrow:0},...rest})}));Square.displayName="Square",(0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__.G)((function Circle2(props,ref){const{size,...rest}=props;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Square,{size,ref,borderRadius:"9999px",...rest})})).displayName="Circle"},"./node_modules/.pnpm/@chakra-ui+object-utils@2.1.0/node_modules/@chakra-ui/object-utils/dist/chunk-R3DH46PF.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function compact(object){const clone=Object.assign({},object);for(let key in clone)void 0===clone[key]&&delete clone[key];return clone}__webpack_require__.d(__webpack_exports__,{o:()=>compact})},"./app/ui/components/UserCard/UserCard.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _ui_components_UserCard__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./app/ui/components/UserCard/index.tsx"),_lib_mocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./app/lib/mocks/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Custom Components/UserCard",tags:["autodocs"],component:_ui_components_UserCard__WEBPACK_IMPORTED_MODULE_0__.Z,argTypes:{user:{description:"Information of user"}},parameters:{controls:{expanded:!0}}};var Default={args:{user:_lib_mocks__WEBPACK_IMPORTED_MODULE_1__._Z}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    user: INITIAL_USER\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./app/ui/components/UserCard/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var C_asnet_envato_storybook_envato_market_dashboard_dashboard_node_modules_pnpm_babel_runtime_7_24_5_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/.pnpm/@babel+runtime@7.24.5/node_modules/@babel/runtime/helpers/esm/extends.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@14.0.5-canary.53_@babel+core@7.23.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/index.js"),react_fast_compare__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/react-fast-compare@3.2.2/node_modules/react-fast-compare/index.js"),react_fast_compare__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_1__),_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+layout@2.3.1_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs"),_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+avatar@2.3.0_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/avatar/dist/chunk-V7PAE35Z.mjs"),_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+layout@2.3.1_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs"),_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+layout@2.3.1_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/layout/dist/chunk-7OLJDQMT.mjs"),_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+layout@2.3.1_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs"),_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/.pnpm/@chakra-ui+button@2.1.0_@chakra-ui+system@2.6.2_react@18.2.0/node_modules/@chakra-ui/button/dist/chunk-6QYXN73V.mjs"),_ui_components_Icons__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./app/ui/components/Icons/index.ts"),_lib_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./app/lib/utils/index.ts"),_lib_mocks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./app/lib/mocks/index.ts"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement,UserCardComponent=function UserCardComponent(_ref){var _ref2=_ref.user||_lib_mocks__WEBPACK_IMPORTED_MODULE_4__.x,_ref2$firstName=_ref2.firstName,firstName=void 0===_ref2$firstName?"":_ref2$firstName,_ref2$lastName=_ref2.lastName,lastName=void 0===_ref2$lastName?"":_ref2$lastName,_ref2$position=_ref2.position,position=void 0===_ref2$position?"":_ref2$position,_ref2$lastActive=_ref2.lastActive,lastActive=void 0===_ref2$lastActive?"":_ref2$lastActive,_ref2$lastPlace=_ref2.lastPlace,lastPlace=void 0===_ref2$lastPlace?"":_ref2$lastPlace,_ref2$level=_ref2.level,level=void 0===_ref2$level?"":_ref2$level,_ref2$workTime=_ref2.workTime,workTime=void 0===_ref2$workTime?"":_ref2$workTime,_ref2$avatarURL=_ref2.avatarURL,avatarURL=void 0===_ref2$avatarURL?"":_ref2$avatarURL,_ref2$salary=_ref2.salary,salary=void 0===_ref2$salary?0:_ref2$salary,_ref2$experience=_ref2.experience,experience=void 0===_ref2$experience?"":_ref2$experience,hiringAgent=_ref2.hiringAgent,_ref2$jobTitle=_ref2.jobTitle,jobTitle=void 0===_ref2$jobTitle?"":_ref2$jobTitle,_ref3=hiringAgent||{},_ref3$avatarURL=_ref3.avatarURL,hiringAgentAvatarURL=void 0===_ref3$avatarURL?"":_ref3$avatarURL,_ref3$firstName=_ref3.firstName,hiringAgentFirstName=void 0===_ref3$firstName?"":_ref3$firstName,_ref3$lastName=_ref3.lastName,hiringAgentLastName=void 0===_ref3$lastName?"":_ref3$lastName,_ref3$experience=_ref3.experience,hiringAgentExperience=void 0===_ref3$experience?"":_ref3$experience,iconButtonStyles={variant:"outline",padding:2,rounded:"50%",borderColor:"secondary.350",w:10,h:10,_hover:{bg:"primary.500",borderColor:"primary.500",svg:{stroke:"white"}}};return __jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.xu,{px:12,pb:7,bg:"background.component.primary",rounded:"lg"},__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.q,{src:avatarURL,borderRadius:"xl",borderWidth:"1px",w:16,h:16,pos:"relative",left:"calc(50% - 32px)",top:-8}),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.k,{direction:"column",alignItems:"center",pb:7,mt:-4},__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.X,{as:"h3",variant:"headingXl",color:"text.octonary"},"".concat(firstName," ").concat(lastName)),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{color:"text.nonary"},"".concat(jobTitle," • ").concat(position,", ").concat(lastPlace," • ").concat(lastActive)),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.k,{mt:6,gap:4},__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.h,(0,C_asnet_envato_storybook_envato_market_dashboard_dashboard_node_modules_pnpm_babel_runtime_7_24_5_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_11__.Z)({"aria-label":"Book Mark",icon:__jsx(_ui_components_Icons__WEBPACK_IMPORTED_MODULE_2__.QC,null)},iconButtonStyles)),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.h,(0,C_asnet_envato_storybook_envato_market_dashboard_dashboard_node_modules_pnpm_babel_runtime_7_24_5_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_11__.Z)({"aria-label":"Share Nodes",icon:__jsx(_ui_components_Icons__WEBPACK_IMPORTED_MODULE_2__.k9,null)},iconButtonStyles)))),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.k,{direction:"column",gap:6,py:7,borderY:"solid 1px",borderColor:"border.senary"},__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.k,{alignItems:"center",justifyContent:"space-between"},__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{variant:"textSm",color:"text.denary"},"Experience"),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{variant:"textSm",fontWeight:"semibold",color:"text.primary"},experience)),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.k,{alignItems:"center",justifyContent:"space-between"},__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{variant:"textSm",color:"text.denary"},"Seniority Level"),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{variant:"textSm",fontWeight:"semibold",color:"text.primary"},level)),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.k,{alignItems:"center",justifyContent:"space-between"},__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{variant:"textSm",color:"text.denary"},"Employment"),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{variant:"textSm",fontWeight:"semibold",color:"text.primary"},workTime)),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.k,{alignItems:"center",justifyContent:"space-between"},__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{variant:"textSm",color:"text.denary"},"Salary"),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{variant:"textSm",fontWeight:"semibold",color:"text.primary"},"$",(0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.Pd)(salary,!0)))),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.xu,{pt:6},__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{variant:"textSm",color:"text.denary"},"Hiring Agent"),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.k,{gap:4,mt:4},__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.q,{src:hiringAgentAvatarURL,w:10,h:10}),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.xu,null,__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{variant:"textSm",fontWeight:"semibold",color:"text.primary"},hiringAgentFirstName," ",hiringAgentLastName),__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{color:"primary.500",variant:"textSm"},"HR Specialist •"," ",__jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.x,{as:"span",color:"text.nonary",variant:"textSm"},hiringAgentExperience," Exp"))))))};UserCardComponent.displayName="UserCardComponent";const __WEBPACK_DEFAULT_EXPORT__=(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(UserCardComponent,react_fast_compare__WEBPACK_IMPORTED_MODULE_1___default())}}]);