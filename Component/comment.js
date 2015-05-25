/*
                       _ooOoo_
                      o8888888o
                      88" . "88
                      (| -_- |)
                      O\  =  /O
                   ____/`---'\____
                 .'  \\|     |//  `.
                /  \\|||  :  |||//  \
               /  _||||| -:- |||||-  \
               |   | \\\  -  /// |   |
               | \_|  ''\---/''  |   |
               \  .-\__  `-`  ___/-. /
             ___`. .'  /--.--\  `. . __
          ."" '<  `.___\_<|>_/___.'  >'"".
         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
         \  \ `-.   \_ __\ /__ _/   .-` /  /
    ======`-.____`-.___\_____/___.-`____.-'======
                       `=---='
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 佛祖保佑       永无BUG
    */
var loadFile = 0;
var jsArray = [
	{name:'$',type:false,src:"http://cdn.bootcss.com/jquery/2.1.4/jquery.js"},
	{name:'_',type:false,src:"http://cdn.bootcss.com/underscore.js/1.8.3/underscore-min.js"},
	{name:'Backbone',type:false,src:'http://cdn.bootcss.com/backbone.js/1.1.2/backbone-min.js'},
	{name:'Marionette',type:false,src:'http://cdn.bootcss.com/backbone.marionette/2.4.1/backbone.marionette.js'},
	{name:'$.fn.caret',type:false,src:'http://10.2.5.191/tools/gulp/bower_components/Caret.js/dist/jquery.caret.js'},
	{name:'$.fn.atwho',type:false,src:'http://10.2.5.191/tools/gulp/bower_components/jquery.atwho/dist/js/jquery.atwho.js'},
	{name:'atwhoCss',type:false,src:'../../bower_components/jquery.atwho/dist/css/jquery.atwho.css',isCss:true},
	{name:'$.fn.authsize',type:false,src:'../scripts/vender/jquery.autosize.js'}
];
function loadScript(item,index){
	if(typeof(item['name']) == 'function'){
		loadFile++;
		loadScript(jsArray[loadFile],loadFile);
	}else{
		if(item['isCss'] && item['isCss'] == true){
			var linkCss = document.createElement('link');
			$(linkCss).attr({rel:"stylesheet",type:'text/css',href:item['src']})
			document.head.appendChild(linkCss);
			loadFile++;
			if(loadFile != jsArray.length) loadScript(jsArray[loadFile],loadFile);
		}else{
			var jsSrcipt = document.createElement('script');
			jsSrcipt.src = item.src;
			jsSrcipt.onload = function(){
				loadFile++;
				if(loadFile != jsArray.length) loadScript(jsArray[loadFile],loadFile);
			}
			document.body.parentNode.appendChild(jsSrcipt);
		}
	}
}
var time = setInterval(function(){
	if(loadFile == jsArray.length){
		clearInterval(time);
		var linkCss = document.createElement('style');
		$(linkCss).html('.comment-textarea{width: 100%;height: 100px;padding:6px 10px;line-height: 15px;font-size:14px;resize:none;min-height: 80px;transition: height 0.2s;}\
.main{width: 500px;margin:50px auto 0;}\
.hide{display: none;}\
.post-default-view-c{width: 100%;height: 30px;border:1px solid #b0b0b0;border-radius: 3px;line-height: 30px;color: #666;font-size: 14px;}\
.post-default-view-c .post-default-view-val{padding:0 15px;}\
.comment-post-form{}\
.comment-post-form .comment-post-form-w{}\
.comment-post-form .comment-post-form-w .comment-post-form-c{}\
.comment-post-form-w .comment-post-form-tip{margin-top:15px;font-size: 12px;color: #b0b0b0}\
.comment-post-opear{position: relative;}\
.comment-post-opear .comment-post-form-name{margin:5px 90px 10px 0;}\
.comment-post-opear .comment-post-form-email{margin:0 90px 0 0;}\
.comment-post-form .comment-post-form-w .comment-input{width:100%;height: 36px;padding:0 15px;font-size: 14px;}\
.comment-input::-webkit-input-placeholder{color: #b0b0b0;font-size: 14px;line-height: 1}\
.comment-input::-moz-placeholder{color: #b0b0b0;font-size: 14px;line-height: 1}\
.comment-input:-ms-input-placeholder{color: #b0b0b0!important;font-size: 14px;line-height: 1}\
.comment-post-form .comment-post-form-w .comment-post-form-btns{position:absolute;top:0;right:0;overflow: hidden;}\
.comment-post-form-btns button{display:block;background: none;border:none;min-width: 70px;padding: 0 10px;text-align: center;font-size: 14px;height: 36px;line-height: 1;border:1px solid #ccc;border-radius: 3px;cursor: pointer;outline: none;margin-top: 10px;}\
.comment-post-form-btns button:first-child{margin-right:0;margin-top: 0;}\
.comment-post-form-btns button[disabled]{opacity: 0.5;cursor: default;}\
.comment-post-form-btns .comment-post-form-btn.save{background: #00c8df;border-color: #00b1c6;color: #fff}\
.comment-post-form-btns .comment-post-form-btn.cancel{background: #fff}\
.comment-post-form-btns .comment-post-form-btn.cancel:hover{background: #f7f7f7}\
.comment-list{margin:10px 0 0;}\
.comment-list .loading-view{text-align: left;font-size: 14px;color: #b0b0b0}\
.loading-view .loading-view-c{}\
.comment-list .comment-list-w{text-align: center;}\
.comment-list .comment-list-c{text-align: left;}\
.comment-list-c .comment-list-item{border-top: 1px solid #ccc}\
.comment-list-c .comment-list-item:first-child{border-top: none;margin-top: 0;}\
.comment-list-item .comment-list-item-c{overflow: hidden;padding-bottom: 20px;margin-top: 20px;}\
.comment-list-item .comment-list-item-c .comment-list-item-avatar{float: left;width: 50px;height: 50px;}\
.comment-list-item .comment-list-item-c .comment-list-item-avatar img{width: 50px;height: 50px;}\
.comment-list-item .comment-list-item-c .comment-list-item-info{display: block;margin:0 0 0 70px;font-size: 14px;overflow:hidden;}\
.comment-list-item .comment-list-item-c .comment-list-item-name{}\
.comment-list-item .comment-list-item-c .comment-list-item-content{margin-top:5px;}\
.comment-list-item-content a{text-decoration: none;color: #4174d9}\
.comment-list-w .comment-list-more{margin:0 auto;width: 70px;height: 36px;border:none;background: #00c8df;font-size: 14px;color: #fff;border:1px solid #00b1c6;border-radius: 3px;cursor: pointer;}\
.comment-list-w .comment-list-more[disabled]{opacity: 0.5;cursor: default;}\
		');
		document.head.appendChild(linkCss);

		var data = $('#reportJS').attr('src').split('?')[1].split('&');
		data = _.map(data,function(item){
			var splitData = item.split('=');
			var obj = new Object()
			obj[splitData[0]] = splitData[1]
			return obj
		})
		var nowData = {};
		_.each(data,function(item,key){
			_.extend(nowData,item)
		})
		var main = $('#reportJS').attr('main')
		if(main){
			_.extend(nowData,{region:main})
		}else{
			_.extend(nowData,{sendC: $('#reportJS').attr('sendMain'),listC: $('#reportJS').attr('listMain')})
		}
		init(nowData);
	}
},30)
window.onload = function(){
	loadScript(jsArray[0],0);
}
//前缀问题
function init(data){
	var JWidgets = new Marionette.Application();
  JWidgets.module('report',function(report,JWidgets,Backbone,Marionette,$,_){
		this.startWithParent = false;
    //template
    var template = {};
    report.template = template;

    template.layoutTemplate = _.template('<div class="comment-c">\
  																					<div class="comment-post"></div>\
  																					<div class="comment-list"></div>\
  																				</div>')

    template.postLayoutTemplate = _.template('<div class="comment-post-c"></div>')
    template.postDefaultTemplate = _.template('<div class="post-default-view-c">\
    																							<span class="post-default-view-val">测试内容</span>\
    																						</div>')
    template.formLayout = _.template('<div class="comment-post-form-w">\
    																		<div class="comment-post-form-c"></div>\
    																		<div class="comment-post-form-tip">发表评论需留下您的姓名和邮箱。</div>\
    																		<div class="comment-post-opear">\
	    																		<div class="comment-post-form-name"></div>\
	    																		<div class="comment-post-form-email"></div>\
	    																		<div class="comment-post-form-btns">\
	    																			<button class="comment-post-form-btn save" disabled="disabled" type="button">评论</button>\
	    																			<button class="comment-post-form-btn cancel" type="button">取消</button>\
	    																		</div>\
    																		</div>\
    																	</div>')

    template.loadViewTemplate = _.template('<div class="loading-view-c">加载中…</div>')
    template.listsTemplate = _.template('<div class="comment-list-c"></div>\
    																			<%=initMoreBtn()%>')
    template.listItemTempalte = _.template('<%=initHtml()%>')
    template.emptyViewTemplate = _.template('还没有评论信息！')
	})
	JWidgets.module('report',function(report,JWidgets,Backbone,Marionette,$,_){
		//List
		report.loadView = Marionette.ItemView.extend({
			className:'loading-view',
			template:report.template.loadViewTemplate
		})

		report.listCollection = Backbone.Collection.extend({
			url:'/cmri/as/getpublictimeline',
			initialize:function(){
	      this.datas = {};
	    },
			parse:function(data){
	      console.log(data['data']['page']['pagesize'])
	      _.extend(this.datas,data["data"]['page']);
	      var list = data["data"]["info"];
	      return list;
	    },
	    setDefault:function(options){
      _.extend(this.datas,options);
	    },
	    fetchData:function(datas,type,callback){
	      var self = this;
	      var data = {};
	      data['app_type'] = this.datas["app_type"];
	      data['app_id'] = this.datas['app_id'];
	      if(datas['max_id']){
	        data['max_id'] = datas['max_id'];
	      }else{
	        data["pageno"] = this.datas['pageno'];
	        data["pagesize"] = this.datas['pagesize'];
	        _.extend(data,datas);
	      }
	      this.fetch({data:data,reset:(type=="reset"?true:false),remove:(type=="reset"?true:false),update:(type=="reset"?false:true),success:function(collection,resp){
	        self.trigger('fetch:success');
	        if(callback) callback(collection,resp);
	      }});
	    }
		})

		report.EmptyView = Marionette.ItemView.extend({
			className:'comment-list-none',
			template:report.template.emptyViewTemplate
		})
		report.listItemView = Marionette.ItemView.extend({
			className:'comment-list-item',
			template:report.template.listItemTempalte,
			templateHelpers:function(){
				return {
					initHtml:function(){
						return '<div class="comment-list-item-c">\
											<div class="comment-list-item-avatar">\
												<img src="'+this.user['avatar']['avatar_l']+'"/>\
											</div>\
											<div class="comment-list-item-info">\
												'+this.init_info()+'\
												'+this.init_contentC()+'\
											</div>\
											<div class="comment-list-item-sep"></div>\
										</div>'
					},
					init_info:function(){
						if(this.name){
							return '<div class="comment-list-item-name">'+this.name+'</div>'
						}else{
							return ''
						}
					},
					init_contentC:function(){
						return '<div class="comment-list-item-content">'+this._init_content()+'</div>'
					},
					_init_content:function(){
						var html = this.content.replace(/(@([\u4e00-\u9fa5A-Za-z0-9_-]*))/ig,'<a href="javascript:;" target="_blank">$1</a>');
	          _.each(this.contain_info,function(item){
	            if(html.indexOf(item['name']) > -1){
	              if(item['type']!='osns_n_topic'){
	                html = html.replace(item['name'],'<a href="javascript:;">'+item["name"]+'</a>')
	              }else{
	                html = html.replace(/(#([^#\s]*?)#)/ig,'<a href="/cmri/topic?topic='+item["name"]+'" target="_blank">$1</a>');
	              }
	            }
	          })
	          return html
					}
				}
			}
		})
		report.listsView = Marionette.CompositeView.extend({
			className:'comment-list-w',
			template:report.template.listsTemplate,
			childView:report.listItemView,
			childViewContainer:'.comment-list-c',
			emptyView:report.EmptyView,
			events:{
				'click .comment-list-more':'more'
			},
			ui:{
				'moreBtn':'.comment-list-more'
			},
			templateHelpers:function(){
				var self = this;
				return {
					initMoreBtn:function(){
						var pageData = self.collection.datas;
						return '<button class="comment-list-more '+(pageData['pagesize'] * (pageData['pageno']+1)<pageData['num']?'':'hide')+'" type="button">加载更多</button>'
					}
				}
			},
			more:function(){
				var self = this;
				var pageData = this.collection.datas;
				this.ui.moreBtn.attr({disabled:'disabled'}).html('加载中…')
				this.collection.fetchData({pageno:parseInt(pageData['pageno'])+1},'update',function(){
					self.resetMoreBtn();
				})
			},
			resetMoreBtn:function(){
				var pageData = this.collection.datas;
				this.ui.moreBtn.removeAttr('disabled').html('加载更多')
				if(pageData['pagesize'] * (pageData['pageno']+1)<pageData['num']){
					this.ui.moreBtn.removeClass('hide');
				}else{
					this.ui.moreBtn.addClass('hide')
				}
			}
		})

		report.listController = Marionette.Controller.extend({
			initialize:function(options){
				_.extend(this,options);
				this.start();
			},
			start:function(){
				var self = this;
				this.collection = new report.listCollection({})
				this.loadView = new report.loadView();
				this.region.show(this.loadView);
				this.listsView = new report.listsView({
					collection:this.collection
				})
				this.collection.setDefault({app_id:this.app_id,pagesize:20,pageno:0,num:0,app_type:this.app_type || 'spms_project'});
				this.collection.fetchData({pageno:0,pagesize:20},'reset',function(collection,resp){
	        self.region.show(self.listsView)
	      })
				JWidgets.vent.on('addReport',function(model){
					self.collection.add(model,{at:0})
				})
			}
		});
	})
	JWidgets.module("report",function(report,JWidgets,Backbone,Marionette,$,_){
		//post
		report.fetchCollection = Backbone.Collection.extend({
  		url:'/cmri/crossnetuser/searchuser',
  		parse:function(data){
  			return data['data']['list']
  		}
  	})
  	report.textarea = Backbone.View.extend({
  		tagName:'textarea',
  		className:'comment-textarea',
  		events:{
  			'keyup':'onKeyup'
  		},
  		initialize:function(options){
  			_.extend(this,options)
		    this._init_who();
		    this._initAutoHeight();
  		},
  		_init_who:function(){
  			var emojisData = ["smile", "iphone", "girl", "smiley", "heart", "kiss", "copyright", "coffee","a", "ab", "airplane", "alien", "ambulance", "angel", "anger", "angry",]
  			var emojis = $.map(emojisData, function(value, i) {return {key: value, name:value}});
		    var self = this;
		    var at_config = {
		      at: "@",
		      callbacks: {
		        remote_filter: function(query, callback) {
		        	self.collection.off('reset').on('reset',function(){
	              callback(this.toJSON());
	            });
	            self.collection.fetch({data:{s:query},reset:true});
		        }
		      },
		      limit:8,
		      start_with_space: false,
		      startWithSpace:false
		    };
		    var emoji_config = {
		      at: ":",
		      data: emojis,
		      tpl: "<li class='at' data-value='${atwho-at}${name}'><img src='http://assets.github.com/images/icons/emoji/${name}.png'  height='20' width='20' /></li>",
		      insert_tpl: "<span id='${id}'>${atwho-data-value}</span>",
		      limit:emojis.length
		    }
		    this._input_at = this.$el.atwho(at_config).atwho(emoji_config);
		    var self = this;
		    this._input_at.on('change',function(){
		    	console.info(self.collection,self)
		    	// console.info(self); //匹配到了东西，就显示到这里面了
		    	// console.info(self._input_at.toArray())
		    	self.trigger('keyup',self.$el.val())
		    });
  		},
  		_initAutoHeight: function(){
		    this.$el.autosize();
		  },
		  onKeyup:function(){
		  	this.trigger('keyup',this.$el.val())
		  }
  	})
		report.input = Backbone.View.extend({
			tagName:'input',
  		className:'comment-input',
  		events:{
  			'keyup':'onKeyup'
  		},
  		initialize:function(options){
  			_.extend(this,options);
  			this.$el.addClass(this.key);
  			this.$el.attr(this.attr)
  		},
  		onKeyup:function(){
  			this.trigger('keyup',this.$el.val())
  		}
		})
		report.postLayout = Marionette.LayoutView.extend({
			className:'comment-post-w',
			template:report.template.postLayoutTemplate,
			regions:{
				postC:'.comment-post-c'
			}
		});
		report.postDefaultView = Marionette.ItemView.extend({
			className:'post-default-view',
			template:report.template.postDefaultTemplate,
			events:{
				'click':function(){
					this.trigger("click");
				}
			}
		})
		report.formLayout = Marionette.LayoutView.extend({
			className:'comment-post-form',
			template:report.template.formLayout,
			events:{
				'click .comment-post-form-btn.save':function(){
					this.trigger('save')
				},
				'click .comment-post-form-btn.cancel':function(){
					this.trigger('cancel')
				}
			},
			ui:{
				'saveBtn':'.comment-post-form-btn.save'
			},
			initialize:function(options){
				_.extend(this,options);
				Marionette.LayoutView.prototype.initialize.call(this,options);
			},
			onShow:function(){
				var self = this;
				this.addRegions({container:this.$el.find('.comment-post-form-c'),emailC:this.$el.find('.comment-post-form-email'),nameC:this.$el.find(".comment-post-form-name")});
				this.textarea = new report.textarea({
    			collection:this.collection
    		})

				var re = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,}/ ;

				this.model.bind('change',function(){
					var data = this.toJSON();
					if(data['content']&&data['content'].length!=0 && data['email']&&data['email'].length !=0 && re.test(data['email'])&& data['name']&&data['name'].length !=0){
						self.ui.saveBtn.removeAttr('disabled')
					}else{
						self.ui.saveBtn.attr({disabled:'disabled'})
					}
				})

    		this.textarea.on('keyup',function(data){
    			self.model.set({content:data})
    		})
    		this.email = new report.input({
    			key:'email',
    			attr:{
    				placeholder:'邮箱'
    			}
    		})
    		this.email.on('keyup',function(data){
    			self.model.set({email:data})
    		})
    		this.name = new report.input({
    			key:'name',
    			attr:{
    				placeholder:'姓名'
    			}
    		});
    		this.name.on('keyup',function(data){
    			self.model.set({name:data})
    		})


    		this.emailC.show(this.email);
    		this.nameC.show(this.name)

    		this.container.show(this.textarea);
    		setTimeout(function(){
    			self.textarea.$el.focus();
    		})
			}
		})
		report.postModel = Backbone.Model.extend({
			defaults:{
				user:{
						avatar: {
							avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
							avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm"
						},
						id: "xnqRV7CuSjHm5VX8",
						name: "哈哈哈",
						type: "osns_n_user"
				}
			},
			url:'/spms/as/as'
		})
		report.postController = Marionette.Controller.extend({
			initialize:function(options){
				_.extend(this,options);
				console.info(options,'这个是PostCollection');
				this.start();
			},
			start:function(){
				var self = this;
				console.log(this.region)
				this.model = new report.postModel({app_type:this.app_type,app_id:this.app_id});
				this.collection = new report.fetchCollection();
				this.layout = new report.postLayout();
				this.region.show(this.layout);
				this.resetDefault();
			},
			_init_form:function(){
				var self = this;
				this.form_layout = new report.formLayout({
					collection:this.collection,
					model:this.model
				});
				this.form_layout.off('save cancel').on('save',function(){
					self.model.save({},{success:function(model,resp){
						self.resetDefault();
						JWidgets.vent.trigger('addReport',self.model)
					}});
				}).on('cancel',function(){
					self.resetDefault();
				})
				this.layout.postC.show(this.form_layout);
			},
			resetDefault:function(){
				var self = this;
				this.defaultView = new report.postDefaultView();
				this.defaultView.on('click',function(){
					self._init_form();
				})
				this.layout.postC.show(this.defaultView);
			}
		});
	})
  JWidgets.module('report',function(report,JWidgets,Backbone,Marionette,$,_){
		report.Layout = Marionette.LayoutView.extend({
			className:'comment-w',
			template:report['template']["layoutTemplate"],
			onShow:function(){
				this.addRegions({
					postC:this.$el.find('.comment-post'),
					listC:this.$el.find('.comment-list')
				})
			}
		})

    report.Controller = Marionette.Controller.extend({
    	initialize:function(data){
    		_.extend(this,data);
    		this.start();
    	},
    	start:function(){
    		var self = this;
				var postC,listC;
				if(JWidgets.comment){
					this.layout = new report.Layout();
	    		JWidgets.comment.show(this.layout);
					postC = this.layout.postC;
					listC = this.layout.listC;
				}else{
					postC = JWidgets.sendC;
					listC = JWidgets.listC
				}
				this.post = new report.postController({
					region:postC,
					app_type:this.app_type,
					app_id:this.app_id
				})
    		this.list = new report.listController({
    			region:listC,
    			app_type:this.app_type,
					app_id:this.app_id
    		})
    	},
    	onDestroy:function(){
    		this.layout.remove();
    		this.post.destroy();
    		this.list.destroy();
    	}
    })
    report.addInitializer(function(data){
      report.controller = new report.Controller(data);
    })
    report.addFinalizer(function(){
      report.controller.destroy();
      delete report.controller;
    })
  })
  JWidgets.on('start',function(data){
    JWidgets.report.start(data)
  })
  JWidgets.addInitializer(function(data){
		if(data["region"]){
			var comment = $('<div class="comment"></div>');
			$('.'+data['region']).append(comment)
			JWidgets.addRegions({
				comment:'.comment'
			})
		}else{
			JWidgets.addRegions({
				sendC:'.'+data['sendC'],
				listC:'.'+data['listC']
			})
		}
  })
  JWidgets.start(data);
}
