/**
 * Vesion 1.0
 * Author Kevin yang
 * Support: Modularity, More-config
 * */
(function(){
    me = {
        vesion:1.0,
        isDebug: true,
        isFuture:false,
        setIntervalList:[],
        sysSetIntervalSec:100
    };
    me.fn = {
        length: function(obj){
            var m = this, len = 0;
            (m.isArray(obj) || m.isString(obj)) &&  (len = obj.length);
            if (m.isObject(obj))
                for(var i in obj){ len ++; }
            return len;
        },
        each: function(arr, callback){
            for(var i = 0; i < arr.length; i ++)
                callback(i);
        },
        filetype: function(doc){
            var suffix = doc.substring(doc.lastIndexOf('.') + 1, doc.length);
            if (/(jpg|png|gif|jpge).?/ig.test(suffix))
                return "img";
            if (/(jsp|shtml|htm|html|php|asp|aspx).?/ig.test(suffix))
                return "page";
            if (/(js).?/ig.test(suffix))
                return "js";
            if (/(css).?/ig.test(suffix))
                return "css";
        },
        copy: function(o, n){
            for (var k in n)
                o[k] = n[k];
        },
        // _[name] is private function, _ don't clone
        clone: function(o, n, isCopy){
            for (var k in n)
                (k.indexOf("_") != 1 || isCopy) && !o[k] && (o[k] = n[k]);
        },
        inherit: function(o, n){
            for (var k in n)
                (k.indexOf("_") != 1 && (!n[k] || !n[k].namespace || n[k].namespace != o.namespace)) && !o[k] && (o[k] = n[k]);
        },
        //
        newMe: function(o, n){
            var newObj = {}, m = this;
            n && m.copy(o, n);
            m.copy(newObj, o);
            return newObj;
        },
        _init: function(){
            var m = this;
            var _isType = function(type) {
                return function(obj) {
                    return Object.prototype.toString.call(obj) === "[object " + type + "]"
                }
            };
            var _browser = function(t, v){
                return function(){
                    return $.browser[t] && ($.browser.version == v || v == "0");
                }
            };
            m.isObject = _isType("Object");
            m.isString = _isType("String");
            m.isArray = Array.isArray || _isType("Array");
            m.isFunction = _isType("Function");
            m.isJson = function(obj){
                var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
                return isjson;
            }
            m.isIE = _browser("msie", "0");
            m.isIE6 = _browser("msie", "6.0");
            m.isIE7 = _browser("msie", "7.0");
            m.isIE8 = _browser("msie", "8.0");
            m.isIE9 = _browser("msie", "9.0");
            m.isIE10 = _browser("msie", "10.0");
            m.isIE11 = _browser("msie", "11.0");
            m.isOldWebKit = +navigator.userAgent
                .replace(/.*(?:AppleWebKit|AndroidWebKit)\/(\d+).*/, "$1") < 536;
            m.isUrl = function(urlStr){
                return new RegExp("^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?/$").test(urlStr);
            }
            typeof Array.prototype.indexOf != "function" && (Array.prototype.indexOf = function(obj){
                for (var i = 0; i < this.length; i ++)
                    if (this[i] == obj)
                        return i;
            });
        }
    }
    me.modularity = {
        loadingQueue:{},
        commonParam:{},
        namespaceRegex: /(\w+|\w?)(\s)/ig,
        clsNameRegex: /^\w?/ig,
        clsTable:{},
        setCls: function(namespace){
            var arr = namespace.split('.'), fn = me.fn, cur = this.clsTable;
            fn.each(arr, function(i){
                cur[arr[i]] = cur[arr[i]] || {};
                cur = cur[arr[i]];
            });
            cur["namespace"] = namespace;
            return cur;
        },
        getCls: function(namespace){
            var arr = namespace.split('.'), fn = me.fn, cur = this.clsTable;
            fn.each(arr, function(i){
                cur = cur[arr[i]];
            });
            return cur;
        },
        dependentCls: function(curCls, namespace){
            curCls["dependent"] = curCls["dependent"] || [];
            curCls["dependent"].push(namespace);
            this.beDependentCls(this.setCls(namespace), curCls.namespace);
            this.index = 0;
        },
        beDependentCls: function(curCls, namespace){
            curCls["beDependent"] = curCls["beDependent"] || [];
            curCls["beDependent"].push(namespace);
        },
        get: function(namespace){
            var nsArr = this.getnamespace(namespace), p = window;
            for (var i = 0; i < nsArr.length; i ++)
                if (p[ nsArr[i].replace(/\s/g, "") ])
                    p = p[ nsArr[i].replace(/\s/g, "") ];
                else if (i == 1 && window[ nsArr[i].replace(/\s/g, "") ])
                    return window[ nsArr[i].replace(/\s/g, "") ];
                else
                    return null;
            return p;
        },
        getConfig: function(name){
            if (!name)
                return {};
            var arr = name.split('.'), cig = me.config, path = cig.url + cig.assemblies[arr[0]], _name = arr[0];
            arr.shift();
            return {alias:arr.join('.'),  config:{ path: path, name: _name}};
        },
        getAlias: function(alias, path){
            var cur = alias, arr = path.split('.');
            if (cur[arr[arr.length - 1]])
                return cur[arr[arr.length - 1]];
            while(arr.length){
                cur = cur[arr[0]];
                arr.shift();
            }
            return cur;
        },
        getnamespace: function(namespace){
            if (!namespace)
                throw new Error("namespace can't empty.");
            var len = namespace.match(/\./g).length;
            namespace = namespace.replace(/\./g," ")+" ";
            var nameArr = namespace.match(this.namespaceRegex);
            if (len == nameArr.length - 1)
                return nameArr;
            else
                throw new Error("Namespace:format mistake:"+namespace);
        },
        isClsName: function(name){
            return this.clsNameRegex.test(name);
        },
        loadAssembly: function(cig, alias, name, type, callback, objAlias){
            var arr = new Array(),
                curCig = me.config[cig.name] ? me.config[cig.name] : "",
                p = me.plugin;
            if (!curCig)
                return false;

            var curAlias = this.getAlias( curCig.alias, alias );
            var curPath = cig.path.substring(0, cig.path.lastIndexOf('/')+1);

            me.fn.isJson(curAlias) && (function() {
                curCig && curAlias.page && arr.push(curPath + (curCig.pagesPath || "") + curAlias.page);
                curCig && curAlias.js && arr.push(curPath + (curCig.jsPath || "") + curAlias.js);
                curCig && curAlias.css && arr.push(curPath + (curCig.cssPath || "") + curAlias.css);
            })();

            me.fn.isString(curAlias) && arr.push(curPath + curAlias);
            arr.length && p.preloader.newMe({
                obj:arr,
                vesion: me.version,
                onComplete: function(){
                    typeof callback == "function" && callback(me.modularity.get(name), objAlias);
                },
                onError: function(){
                    //typeof callback == "function" && callback(null);
                    throw new Error(type+" module:"+" -> config:["+ cig.name +"] ->"+alias+" loading error!");
                }
            }).loading();
        },
        _inits : function(obj){
            //me.fn.inherit(obj, obj.parent);
            typeof obj.construct  == "function" && obj.construct();
            var cur = me.modularity.getCls(obj.namespace);
            cur.beDependent && me.fn.each(cur.beDependent, function(i){
                var beDep = me.modularity.getCls(cur.beDependent[i]);
                if ( beDep.dependent.indexOf(cur.namespace) != -1 ){
                    beDep.index = beDep.index || 0;
                    beDep.index ++;
                    if (beDep.dependent.length == beDep.index)
                        me.modularity._inits(me.modularity.get(beDep.namespace));
                }
            });
        },
        _templateFun: {
            params: null,
            newMe : function (opts) {
                return me.fn.newMe(this, {params: opts})
            },
            load: function(name, callback, objAlias){
                var m = this, c = me.config, mode = me.modularity,configInfo = mode.getConfig(name),
                    modeObj = me.modularity.get(name);

                modeObj && typeof callback == "function" && callback(modeObj);
                !modeObj && (
                        !mode.loadingQueue[configInfo.config.name] && (mode.loadingQueue[configInfo.config.name] =  configInfo.config, mode.loadingQueue[configInfo.config.name].data = []),
                            mode.loadingQueue[configInfo.config.name].data.push({ alias: configInfo.alias, callback: callback, type: m.type, objAlias:objAlias })
                    );
                return this;
            },

            extend: function (name, opts) {
                var cls = me.modularity.setCls(this.namespace +"."+ name);
                cls["dependent"] = cls["dependent"] || [];
                var m = this;
                this[name] = this[name] || opts;
                me.fn.clone(this[name] , opts);
                me.fn.inherit(this[name], this);
                var id = ((m[name].id) || name),
                    imports = m[name]["imports"],
                    isUseImport = me.fn.isJson(imports);
                type = m.type;
                m[name]["name"] = name;
                m[name]["namespace"] = m.namespace+"."+name;
                m[name].parent = m;
                m[name]["isMeJs"] = true;

                var loadImports = function(curList, count){
                    for(var ki in curList){
                        if (!me.config.assemblies[ki])
                            throw new Error("Assemblies:"+ki+" not defind");

                        !window[ki] && namespace(ki);
                        for(var ck = 0; ck < curList[ki].length; ck ++) {
                            var cur = curList[ki][ck];
                            window[ki].load(ki+"."+cur.alias, function (o, objAlias) {
                                m[name][objAlias] = o;
                                var beDep = me.modularity.getCls( m[name].namespace),namespace = m[name].imports[objAlias];
                                if ((!o || !o.isMeJs)
                                    && beDep.dependent.indexOf(namespace) != -1){
                                    beDep.index = beDep.index || 0;
                                    beDep.index ++;
                                    beDep.index == beDep.dependent.length && me.modularity._inits(me.modularity.get(beDep.namespace));
                                }
                            }, cur.name);
                        }
                    }
                }
                isUseImport && function (){
                    var curList = {};
                    for(var k in imports){
                        me.modularity.dependentCls(cls,imports[k]);
                        var arr = imports[k].split('.'), assembly = arr[0];
                        arr.shift();
                        !curList[assembly] && (curList[assembly] = new Array());
                        curList[assembly] && curList[assembly].push( { alias: arr.join('.'), name:k } );
                    }
                    loadImports(curList);
                }();
                !isUseImport &&  me.modularity._inits(m[name]);
            }
        },
        register: function(modularity){
            me.fn.clone(modularity, this._templateFun);
        },
        setInterval:function(){
            var m = this;
            var load = function(cur){
                while(cur.data.length) {
                    m.loadAssembly(cur, cur.data[0].alias, cur.name + "." + cur.data[0].alias, cur.data[0].type, cur.data[0].callback, cur.data[0].objAlias);
                    cur.data.shift();
                }
            }
            for(var i in m.loadingQueue)
            {
                var cur =m.loadingQueue[i];
                !cur.isloading && (function (cur) {
                    me.plugin.preloader.newMe({
                        obj: [cur.path],
                        async: false,
                        vesion: me.vesion,
                        onComplete: function () {
                            cur.isloading = true;
                            load(cur);
                        },
                        onError: function(){
                            cur.isloading = true;
                            throw new Error("File "+cur.path+" loading error.");
                        }
                    }).loading();
                })(cur);
                cur.isloading && load(cur);
            }
        },
        init: function(){
            setInterval(function(){
                for(var i = 0; i < me.setIntervalList.length; i ++) {
                    if ( me.setIntervalList[i].setIntervalSec ) {
                        me.setIntervalList[i].curSec = me.setIntervalList[i].curSec || 0;
                        me.setIntervalList[i].curSec += me.sysSetIntervalSec;
                        me.setIntervalList[i].curSec >= me.setIntervalList[i].setIntervalSec && ( me.setIntervalList[i].setInterval(), me.setIntervalList[i].curSec = 0)
                    }
                }
                me.modularity.setInterval();
            }, me.sysSetIntervalSec);
            window.onerror = function(sMsg,sUrl,sLine){
                var errorMsg = new Array();
                errorMsg.push("Error:"+sMsg+"\r\n");
                errorMsg.push("Line:"+sLine+"\r\n");
                errorMsg.push("URL:"+sUrl+"\r\n");
                me.isDebug && window.console && window.console.log(errorMsg.join(''));
                me.isDebug && !window.console && alert(errorMsg.join(''));
            };
        }
    };
    window.namespace = function(name){
        var analyzeNamespace = function(n){
            var arr = n.split('.'), parent = window, curNamespace = [];
            for(var i = 0; i < arr.length; i ++){
                !parent[arr[i]] && (parent[arr[i]] = {});
                me.modularity.register(parent[arr[i]]);
                parent[arr[i]]["parent"] = parent;
                parent = parent[arr[i]];
                parent["name"] = arr[i];
                curNamespace.push(arr[i]);
                parent["namespace"] = curNamespace.join('.');
            }
            me.modularity.setCls(name);
            return parent;
        }
        return analyzeNamespace(name);
    }
    window.assembly = function(alias, url){
        me.config.assemblies[alias] = url;
    }
    me.fn._init();
    me.modularity.init();
    namespace("me").extend("config", {
        url:"",
        assemblies:{},
        destruct: function(){

        }
    });
    namespace("me").extend("plugin", {
            construct: function(){
                this.preloader.newMe = me.modularity._templateFun.newMe;
            },
            preloader: {
                namespace:"me.plugin.preloader",
                name:"preloader",
                completed:null,
                params: {
                    isAsyn: false,
                    obj: undefined,
                    onProgress: undefined,
                    onComplete: undefined,
                    totleSize: 0
                },
                _load: function(fileType){
                    var info = {
                        tag: fileType == "js" ? "script" : "link",
                        typeAttr: fileType == "js" ? "type" : "rel",
                        type:  fileType == "js" ? "text/javascript" : "stylesheet",
                        srcType: fileType == "js" ? "src" : "href"
                    };
                    return function(self, src, size, vesion){
                        var s = document.createElement(info.tag),
                            m = self,
                            o = m.params,
                        //c = me.config,
                            fn = me.fn;
                        s[info.typeAttr] = info.type;
                        s.charset="utf-8"
                        s.async = o.isAsyn;
                        s[info.srcType] =  src+ "?v=" + vesion;
                        var callback = function(type){
                            m.completed = m.completed || {};
                            m.completed[s[info.srcType]] = { size: size };
                            typeof o.onProgress == "function" && o.onProgress((size / o.totleSize) * 100, this.src, "js", type);
                            fn.length(m.completed) == o.obj.length && typeof o.onComplete == "function" && o.onComplete();
                        }
                        me.fn.isOldWebKit && info.tag == "link" && setTimeout(callback, 20);
                        s.onload = s.onreadystatechange = function(event){
                            this.onerror = this.onabort = this.onload = null;
                            if(! this.readyState  || this.readyState=='loaded' || this.readyState=='complete') {
                                callback();
                            }
                        };
                        s.onerror = function(r){
                            this.onerror = this.onabort = this.onload = null;
                            typeof o.onError == "function" && o.onError();
                        }
                        var  firstScript = document.getElementsByTagName('script')[0];
                        firstScript.parentNode.insertBefore(s, firstScript);
                    }
                },
                loading: function(opts){
                    var m = this, fn = me.fn, p = m.params;
                    fn.isArray(m.params.obj) && fn.each(m.params.obj, function(i){
                        fn.isString(m.params.obj[i]) && m.load(m.params.obj[i]);
                        fn.isObject(m.params.obj[i]) && m.load(m.params.obj[i].path, m.params.obj[i].size);
                    });
                    return this;
                },
                load: function(path, size){
                    var m = this,
                        o = m.options,
                        fn = me.fn,
                        vesion = me.vesion,
                        fileType = fn.filetype(path);
                    !m["_load"+ fileType] && (m["_load"+fileType] = m._load(fileType));
                    m["_load"+fileType](m, path, size, vesion);
                    return this;
                }
            },
            destruct: function(){

            }
    });
})(window);