$.support.Ie8_9 = (function(){
  var userAgent = navigator.userAgent.toLowerCase()
  return userAgent.indexOf('msie 8.0')>-1 || userAgent.indexOf('msie 9.0')>-1
})();
var apptypeName = {
	osns_app_as:'信息流',
	osns_app_project:'项目',
	osns_app_task:'任务',
	osns_app_file:'文件',
	spms_project:'信息流',
	pms_as:'信息流'
}
JWidgets.module('docView',function(docView,JWidgets,Backbone,Marionette,$,_){})
JWidgets.module('docView.Templates',function(Templates,JWidgets,Backbone,Marionette,$,_){
	Templates.layout = _.template('<div class="doc-view-w">\
									<div class="doc-view-c">\
										<div class="doc-view-l">\
											<div class="doc-view-opear"></div>\
											<div class="doc-view-itemView">\
											</div>\
											<div class="doc-view-moreView"></div>\
										</div>\
										<div class="doc-view-r">\
											<div class="doc-view-info"></div>\
											<div class="doc-view-comment"></div>\
										</div>\
									</div>\
									<div class="doc-view-load"></div>\
									<div class="doc-view-close">\
										<i class="fa fa-close"></i>\
									</div>\
								</div>');
	Templates.loadingView = _.template('<div class="doc-loading">\
											<div class="spinner">\
										  		<div class="spinner-container container1">\
												    <div class="circle1"></div>\
												    <div class="circle2"></div>\
												    <div class="circle3"></div>\
												    <div class="circle4"></div>\
												  </div>\
												  <div class="spinner-container container2">\
												    <div class="circle1"></div>\
												    <div class="circle2"></div>\
												    <div class="circle3"></div>\
												    <div class="circle4"></div>\
												  </div>\
												  <div class="spinner-container container3">\
												    <div class="circle1"></div>\
												    <div class="circle2"></div>\
												    <div class="circle3"></div>\
												    <div class="circle4"></div>\
												  </div>\
											</div>\
										</div>')
	Templates.opearTemplate = _.template('	<div class="doc-view-opear-img"><%= ImgHtml() %></div>\
											<div class="doc-view-opear-same">\
												<a href="<%= link %>" target="_blank"><div class="doc-view-opear-item down">\
													<i class="fa fa-download"></i>\
												</div></a>\
												<div class="doc-view-opear-item share">\
													<i class="fa fa-share"></i>\
												</div>\
											</div>\
											<div class="doc-view-opear-doc"><%= DocHtml()%></div>\
										')
	Templates.moreItems = _.template('<%= opearBtn() %>\
											<div class="doc-view-moreView-bg hide"></div>\
											<div class="doc-view-moreView-c">\
											<div class="doc-view-moreView-main" style="height:0;">\
												<div class="doc-view-moreView-title">\
													<div class="doc-view-moreView-title-val">所有文件</div>\
													<div class="doc-view-moreView-title-close">\
														<i class="fa fa-close"></i>\
													</div>\
												</div>\
												<div class="doc-view-moreView-content"></div>\
											</div>\
											<div class="doc-view-moreView-info">\
												<%= showMoreHtml() %>\
												<div class="doc-view-moreView-info-val">\
													<span class="doc-view-moreView-nowName"><%= fileFrom() %></span>\
													<span>第<i class="doc-view-moreView-nowNum"><%= nowNum() %></i>个，共<i class="doc-view-moreView-allNum"><%= allNum() %></i>个</span>\
												</div>\
											</div>\
										</div>');
	Templates.itemView = _.template('<%= contentHtml() %>')

	/*
	<div class="doc-view-detail-item"><label>说明：</label><span>2</span></div>
	 */
	Templates.infoView = _.template('<div class="doc-view-info-c">\
																			<h3 class="doc-view-name ellipsis"><%= show_name %></h3>\
																			<div class="doc-view-user">\
																				<div class="doc-view-user-avatar">\
																					<img src="<%= user["avatar"]["avatar_s"]%>"/>\
																				</div>\
																				<div class="doc-view-user-info">\
																					<div class="doc-view-user-title ellipsis"><%= user["name"]%></div>\
																					<div class="doc-view-user-date"><%= fileType() %><span><%=changeData()%></span></div>\
																				</div>\
																			</div>\
																			<div class="doc-view-detail down">\
																				<div class="doc-view-detai-title">\
																					<span class="circle"><i class="fa fa-info-circle"></i></span>\
																					<span class="val">文件详细信息</span>\
																					<span class="showInfoTypeBtn down"><i class="fa fa-chevron-down"></i></span>\
																					<span class="showInfoTypeBtn up"><i class="fa fa-chevron-up"></i></span>\
																				</div>\
																				<div class="doc-view-detail-w">\
																					<div class="doc-view-detail-c">\
																						<div class="doc-view-detail-item"><label>查看次数：</label><span><%= viewed_num || 0 %></span></div>\
																						<div class="doc-view-detail-item"><label>评论数：</label><span>0</span></div>\
																						<div class="doc-view-detail-item"><label>下载数：</label><span><%=download_num %></span></div>\
																						<div class="doc-view-detail-item"><label>尺寸：</label><span><%= width %>*<%=height%></span></div>\
																						<div class="doc-view-detail-item"><label>文件名：</label><span class="ellipsis"><%= show_name %></span></div>\
																						<div class="doc-view-detail-item"><label>文件大小：</label><span><%= file_size/1000 %>KB</span></div>\
																						\
																					</div>\
																				</div>\
																			</div>\
																	</div>')

	Templates.showItemView = _.template('<div class="doc-view-item-c"><%= contentHtml() %></div>\
																			<div class="doc-view-zoom-w hide">\
																				<div class="doc-view-zoom-c">\
																					<%= zoomImg() %>\
																					<div class="doc-view-zoom"></div>\
																				</div>\
																			</div>')

})
JWidgets.module('docView.DataHeap',function(DataHeap,JWidgets,Backbone,Marionette,$,_){
	this.publicModel = Backbone.Model.extend({});
	this.collection = Backbone.Collection.extend({
		url:'/spms/files/',
		initialize:function(){
			this.datas = {}
		},
		parse:function(datas){
			var self = this;
			_.extend(this.datas,datas["data"]);
			this.publicModel.set(_.filter(datas["data"]['files'],function(item,index){
				if(item["id"] == self.datas["id"]){
					self.datas['nowNum'] = index;
					item.active = true
					return item
				}
			})[0]);
			return datas["data"]['files'];
		}
	});
})
JWidgets.module('docView.init',function(init,JWidgets,Backbone,Marionette,$,_){

	this.layoutTemplate = Marionette.LayoutView.extend({
		template:JWidgets.docView.Templates.layout,
		regions:{
			opearRegion:'.doc-view-opear',
			itemViewRegion:'.doc-view-itemView',
			moreViewRegion:'.doc-view-moreView',
			infoViewRegion:'.doc-view-info',
			commentRegion:'.doc-view-comment',
			loadingRegion:'.doc-view-load'
		},
		triggers:{
			'click .doc-view-close':'closeDocView'
		}
	})

	this.loadViewFunc = Marionette.ItemView.extend({
		template:JWidgets.docView.Templates.loadingView
	})

	this.ItemView = Marionette.ItemView.extend({
		className: 'doc-view-item',
		template:JWidgets.docView.Templates.itemView,
		templateHelpers:function(){
			return {
				contentHtml:function(){
						return '<img src="'+this.append["thumbnails"]["link"]+'" class="doc-view-item-img"/>'
				}
			}
		},
    modelEvents:{
      "change":'render'
    },
    triggers:{
      'click':'addActive'
    },
    ui:{
    	img:'img'
    },
		render:function(){
			Marionette.ItemView.prototype.render.call(this);
			this.model.get('active')?this.$el.addClass('active'):this.$el.removeClass('active');
			return this;
		},
		onRender:function(){
			var img = this.ui.img;
			var imgW = this.model.get("append")["thumbnails"]["width"];
			var imgH = this.model.get("append")["thumbnails"]["height"];
			var nowH = 0,nowW = 0;
			if(imgW>imgH){
				nowH = 100;
				nowW = imgW * (100/imgH);
				img.css({width:nowW+'px',height:nowH+"px",left:'-'+(nowW-100)/2+'px'});
			}else{
				nowW = 100;
				nowH = imgH*(100/imgW);
				img.css({width:nowW+"px",height:nowH+'px',top:'-'+(nowH-100)/2+'px'});
			}
		}
	})

	this.showItemViewFunc = Marionette.LayoutView.extend({
		className:'doc-view-item-w',
		template:JWidgets.docView.Templates.showItemView,
		events:{
			'mousedown .doc-view-zoom':'moveZoom'
		},
		modelEvents:{
			'change':'render'
		},
		initialize:function(options){
			var self = this;
			_.extend(this,options);
			var time;
			$(window).on('resize',function(){
				clearTimeout(time);
				time = setTimeout(function(){
					self.render();
				},200)
			})
		},
		templateHelpers:function(){
			return {
				contentHtml:function(){
					var self = this;
					if(this.file_type == 'osns_n_image'){
						return '<img src="'+self.append["original"]["link"]+'" class="doc-view-item-img" />'
					}else return this.html
				},
				zoomImg:function(){
					if(this.file_type == 'osns_n_image'){
						return '<img src="'+this.append["original"]["link"]+'" class="zoom-img" />'
					}
				}
			}
		},
		ui:{
			img:'.doc-view-item-img',
			canvas:'canvas',
      iframe:'iframe',
      container:'.doc-view-item-c',
      zoomW:'.doc-view-zoom-w',
      zoomC:'.doc-view-zoom-c',
      zoom:'.doc-view-zoom'
		},
		onRender:function(){
			this.resetSize();
			this.zoomW = this.ui.zoomW;
			this.zoomC = this.ui.zoomC;
			this.dragZoom = this.ui.zoom;
		},
    fullscreen:function(){
    	var clientW = document.documentElement.clientWidth || document.body.clientWidth;
    	var clientH = document.documentElement.clientHeight || document.body.clientHeight;
      if(this.model.get("file_type") =='jw_n_doc' || this.model.get("file_type") == 'onsn_app_doc'){
        this.ui.container.removeClass("other");
        this.ui.iframe.addClass('docFull');
        this.ui.container.css({height:clientH+52+'px'});
      }else{
      	this.scaleHot = 0;
      	this.ui.container.css({transform:'rotate(0deg)'});
        this.ui.container.addClass("other");
        this.ui.container.css({width:clientW+'px',height:clientH+'px',top:0});
      }
      if(this.zoomType == true) this.zoom()
    },
    exitFull:function(width,height){
      if(this.model.get("file_type") =='jw_n_doc' || this.model.get("file_type") == 'onsn_app_doc'){
      	this.ui.container.removeClass('other');
        this.ui.iframe.removeClass('docFull');
        this.ui.container.css({height:height+52+'px'});
      }else{
        this.ui.container.addClass("other");
        this.ui.container.css({width:width+'px',height:height+'px',top:0});
      }
      if(this.zoomType == true) this.zoom();
    },
    turn:function(type){
    	if(this.zoomType == true) this.zoom()
    	if(type == 'r'){
    		this.scaleHot+=90
    	}else{
    		this.scaleHot-=90
    	}
    	if(this.scaleHot == 360 || this.scaleHot == -360){
    		this.scaleHot = 0
    	}
    	var img = this.ui.img;
    	var imgW = img.width();
    	var imgH = img.height();
    	var regionH = this.region.$el.height();
    	var regionW = this.region.$el.width();
    	if(this.scaleHot == 0 || this.scaleHot == 180 || this.scaleHot == -180){
    		var str = ''
    		if(imgW>imgH){
    			this.ui.container.css({width:regionW+'px',height:regionH+'px',top:0});
    		}else{

    		}
    	}else{
    		if(imgW>imgH){
    			var height = 0,top=0
    			if(imgW>regionH){
    				height = regionH * (regionH / imgW);
    				top = (regionH-height)/2
    			}else{
    				height = regionH / (imgW /regionH);
    				top = (regionH-height)/2
    			}
    			this.ui.container.css({height:height+'px',top:top+'px'});
    		}else{
    			this.ui.container.css({height:regionH+'px',top:0});
    		}
    	}
    	this.ui.container.css({transform:'rotate('+this.scaleHot+'deg)'});
    },
    resetSize:function(){
    	this.scaleHot = 0;
      this.scaleType = 1;
      this.ui.container.removeClass('zoom');
	    this.zoomType = false;
	    this.ui.zoomW.addClass('hide');
    	this.ui.container.css({transform:'rotate(0deg)'});
    	if(this.model.get("file_type") == 'osns_n_doc' || this.model.get("file_type") == 'jw_n_doc'){
      	this.ui.container.removeClass('other');
				this.ui.container.css({top:"-52px",left:"0",right:0,bottom:0,width:"100%",height:this.region.$el.height()+52+'px'});
			}else{
				this.ui.container.addClass('other');
				this.ui.container.css({width:this.region.$el.width()+'px',height:this.region.$el.height()+'px',top:0});
			}
    },
    zoom:function(){
    	var zoomW = this.ui.zoomW
    	this.ui.container.css({transform:'rotate(0deg)'});
		  this.scaleHot = 0;
    	if(this.zoomType == true){
    		this.ui.container.removeClass('zoom');
	    	this.zoomType = false;
	    	zoomW.addClass('hide');
	    	this.render();
    	}else{
    		var zoomC = this.ui.zoomC;
    		var dragZoom = this.ui.zoom;
	    	var regionW = this.region.$el.width();
	    	var regionH = this.region.$el.height();
	    	var imgW = this.model.get("append")['original']['width'];
	    	var imgH = this.model.get("append")['original']['height'];
	    	var width = 0,height=0,top=0,bottom=0,right=0,left=0;
	    	if(imgW > regionW || imgH > regionH){
	    		this.zoomType = true;
					this.ui.container.addClass('zoom');
					this.ui.img.addClass('zoom');
	    		zoomW.removeClass('hide');
	    		this.ui.img.css({width:imgW+'px',height:imgH+'px'});
	    		if(imgW < regionW){
	    			this.ui.img.css({left:(regionW-imgW)/2+"px"});
	    		}
	    		if(imgH < regionH){
	    			this.ui.img.css({top:(regionH-imgH)/2+"px"});
	    		}
	    		if(imgW > imgH){
	    			var scale = zoomW.width() / imgW;
						width = "100%";
						height = imgH * scale;
						top = (zoomW.height() - parseInt(height)) / 2;
						zoomC.css({width:width,height:height+'px',top:top+'px'});
						if(regionW < imgW){
							width = zoomW.width() * (regionW / imgW)+'px';
						}
						dragZoom.css({width:width,height:height * (regionH / imgH) +'px'});
	    		}else{
	    			var scale = zoomW.height() / imgH;
						width = imgW * scale;
						left = (zoomW.width() - width) / 2;
						zoomC.css({width:width+'px',height:'100%',left:left+'px'});
						if(regionW < imgW){
							width = width * (regionW / imgW)+'px';
						}
						dragZoom.css({width:width,height:zoomC.height() * (regionH / imgH) +'px'});
	    		}
	    	}
    	}
    },
    moveZoom:function(evt){
    	var self = this;
    	var regionW = this.region.$el.width();
	    var regionH = this.region.$el.height();
	    var imgW = this.model.get("append")['original']['width'];
	    var imgH = this.model.get("append")['original']['height'];
    	var oldX = evt.clientX - this.dragZoom.position().left,
    			oldY = evt.clientY - this.dragZoom.position().top;
			if(evt.button !=0 ) return
    	document.onmousemove = function(evt){
    		var nowX = evt.clientX,nowY = evt.clientY;
    		var top = nowY - oldY,left = nowX - oldX;
    		if(left<=0) left = 0;
    		else if(left >= self.zoomC.width()-self.dragZoom.outerWidth()) left = self.zoomC.width()-self.dragZoom.outerWidth();
    		if(top <=0) top = 0;
    		else if(top >= self.zoomC.height()-self.dragZoom.outerHeight()) top = self.zoomC.height()-self.dragZoom.outerHeight();
    		self.dragZoom.css({left:left +'px',top:top +'px'});
    		if(regionW > imgW){
    			if(regionH < imgH){
    				self.ui.img.css({top:'-' + imgH * (top / self.zoomC.height())+'px'});
    			}
    		}else{
    			self.ui.img.css({left:'-'+imgW * (left / self.zoomC.width())+'px'})
    			if(regionH < imgH){
    				self.ui.img.css({top:'-' + imgH * (top / self.zoomC.height())+'px'});
    			}
    		}
    	}
    	document.onmouseup = function(){
    		document.onmousemove = null;
    		document.onmouseup = null;
	    }
	    return false;
    }
	})
	this.MoreViews = Marionette.CompositeView.extend({
		className:'doc-view-moreView-w',
		template: JWidgets.docView.Templates.moreItems,
		events:{
			'click .doc-view-moreView-pre':'pre',
			'click .doc-view-moreView-next':'nex',
			'click .doc-view-moreView-btnc':'showLists',
			'click .doc-view-moreView-title-close':'closeLists'
		},
		childViewContainer:'.doc-view-moreView-content',
    childView: this.ItemView,
    childEvents:{
      'addActive':function(view,argument){
        var model = argument.model;
        _.each(this.collection.models,function(item){
          item.set({active:false})
        })
        model.set({active:true});
        this.model.clear({silent:true}).set(model.toJSON());
        var num = this.collection.indexOf(model);
        this.closeLists();
        this.ui.nowNumC.html(num+1);
        this.collection.datas['nowNuw'] = num;
      }
    },
    templateHelpers:function(){
      var self = this;
      return {
        opearBtn:function(){
          if(self.collection.length>1){
            return '<div class="doc-view-moreView-opear">\
                    <div class="doc-view-moreView-pre">\
                      <i class="fa fa-chevron-left"></i>\
                    </div>\
                    <div class="doc-view-moreView-next">\
                      <i class="fa fa-chevron-right"></i>\
                    </div>\
                  </div>'
          }
        },
        showMoreHtml:function(){
          if(self.collection.length>1){
            return '<div class="doc-view-moreView-btnc">\
                      <div class="doc-view-moreView-btn">查看全部</div>\
                      <i class="fa fa-caret-up"></i>\
                    </div>'
          }
        },
        fileFrom:function(){
          var data = self.collection.datas['info'];
          var name = ''
          if(data['name'] &&data['name'] !="") name = data['name'];
          else name = '来自'+apptypeName[data['app_type']];
          return '<span>'+name+'</span><span>'+data["user"]["name"]+'创建</span>'
        },
        nowNum:function(){
          var model = self.collection.get(self.collection.publicModel.get("id"));
          return (self.collection.indexOf(model)+1);
        },
        allNum:function(){
          return self.collection.length;
        }
      }
    },
    ui:{
      nowNumC:'.doc-view-moreView-nowNum',
      listMain:'.doc-view-moreView-main',
      bg:'.doc-view-moreView-bg'
    },
    modelEvents:{
      'change':function(){
        this.ui.nowNumC.html(this.collection.datas['nowNum']+1);
      }
    },
    pre:function(){
      var num = this.collection.datas['nowNum'];
      if(num == 0) num = this.collection.length-1
      else num--;
      this.collection.datas['nowNum'] = num;
      var model = this.collection.at(num);
      _.each(this.collection.models,function(item){
        item.set({active:false});
      })
      model.set({active:true});
      this.collection.publicModel.clear({silent:true}).set(model.toJSON());
    },
    nex:function(){
      var num = this.collection.datas['nowNum'];
      if(num == this.collection.length-1) num = 0
      else num++;
      this.collection.datas['nowNum'] = num;
      var model = this.collection.at(num);
      _.each(this.collection.models,function(item){
          item.set({active:false});
        })
      model.set({active:true});
      this.collection.publicModel.clear({silent:true}).set(model.toJSON());
    },
    showLists:function(){
    	if(this.ui.bg.hasClass("hide")){
    		this.ui.bg.removeClass('hide')
	      this.ui.listMain.animate({height:'250px'},200);
    	}else{
	    	this.closeLists();
      }
    },
    closeLists:function(){
    	this.ui.bg.addClass('hide')
      this.ui.listMain.animate({height:'0px'},200);
    }
	})
	this.opearView = Marionette.LayoutView.extend({
		className:'doc-view-opear-c',
		template:JWidgets.docView.Templates.opearTemplate,
		templateHelpers:function(){
			var self = this;
			return{
				ImgHtml:function(){
					if(this.file_type =='osns_n_image'){
            var str = '<div class="doc-view-opear-item turn-r"><i class="fa fa-repeat"></i></div>\
											<div class="doc-view-opear-item turn-l"><i class="fa fa-rotate-left"></i></div>'
            if(!$.support.Ie8_9) str+='<div class="doc-view-opear-item funscrenn"><i class="fa fa-arrows-alt"></i></div>';
            var data = self.model.get("append")['original'];
            if(data['height'] < 6000 && data["width"]< 5000) str+='<div class="doc-view-opear-item zoom"><i class="fa fa-square-o"></i></div>'
            str+='<div class="doc-view-opear-item newopen"><a href="'+data["link"]+'" target="_blank"><i class="fa fa-plus-square-o"></i></a></div>'
					  return str
					}else{
						return ''
					}
				},
				DocHtml:function(){
					if(this.file_type !='osns_n_image'){
            var str = '';
            if(!$.support.Ie8_9) str+='<div class="doc-view-opear-item funscrenn"><i class="fa fa-arrows-alt"></i></div>'
            // str+='<div class="doc-view-opear-item newopen"><a href="'+self.model.get("link")+'" target="_blank"><i class="fa fa-plus-square-o"></i></a></div>';//新开窗口未处理
					  return str
					}else{
						return ''
					}
				}
			}
		},
		modelEvents:{
			'change':'render'
		},
		triggers:{
      'click .turn-r':'turnR',
      'click .turn-l':'turnL',
      'click .funscrenn':'funScrenn',
      'click .share':'share',
      'click .zoom':'zoom'
    },
    ui:{
      imgEl:'.doc-view-item-c'
    }
	})
	this.infoView = Marionette.LayoutView.extend({
		className:'doc-view-info-w',
		template:JWidgets.docView.Templates.infoView,
		templateHelpers:function(){
			var self = this;
			return {
				changeData:function(){
					return (new Date(this.created_at*1000)).format('yyyy年MM月dd日')
				},
				fileType:function(){
					return '上传自'+apptypeName[this.app_type]
				}
			}
		},
		ui:{
			'detailC':'.doc-view-detail-w'
		},
		events:{
			'click .doc-view-detail.down':'showDetailDown',
			'click .doc-view-detail.up':'showDetailUp'
		},
		modelEvents:{
			'change':'render'
		},
		showDetailDown:function(evt){
			$(evt.currentTarget).removeClass('down').addClass('up')
			this.ui.detailC.stop().slideDown(200);
		},
		showDetailUp:function(evt){
			$(evt.currentTarget).removeClass('up').addClass('down')
			this.ui.detailC.stop().slideUp(200);
		}
	})
	this.Controller = Marionette.Controller.extend({
		initialize:function(options){
			_.extend(this,options);
			this.start();
		},
		start:function(){
			var self = this;
			var container = $('<div class="doc-view"></div>');
			var body = $('body')
			body.css({overflow:'hidden'});
			body.append(container);

			this.layout = new JWidgets.docView.init.layoutTemplate({
				el:container
			});
			this.layout.render();//初始化整个结构
			this.loadView = new JWidgets.docView.init.loadViewFunc();//初始化loading
			this.layout.loadingRegion.show(this.loadView);//展示loading
			this.layout.once('closeDocView',function(){
				$(window).off("resize");
				body.css({overflow:'inherit'});
				self.layout.destroy();
			})
			$(document).one('keyup',function(evt){
				if(evt.keyCode == 27){
					self.layout.trigger('closeDocView');
				}
			})
			this.publicModel = new JWidgets.docView.DataHeap.publicModel();//初始化公共Model
			this.collection = new JWidgets.docView.DataHeap.collection();//初始化collection
			this.collection.publicModel = this.publicModel;
			this.collection.datas['id'] = this.id;

			var model = Backbone.Model.extend({
				url:"/spms/file/getfolder/"
			});
			var newModel = new model()
			newModel.save({},{url:'/spms/file/getfolder/?id='+this.id,success:function(model,resp){
				var datas = resp["data"]['files'];
				self.publicModel.set(_.filter(datas,function(item,index){
					if(item["id"] == self.id){
						self.collection.datas['nowNum'] = index;
						item.active = true
						return item
					}
				})[0]);
				_.extend(self.collection.datas,resp["data"])
				self.collection.add(datas);
				self.showItemView = new JWidgets.docView.init.showItemViewFunc({model:self.publicModel,region:self.layout.itemViewRegion});
        self.opearView = new JWidgets.docView.init.opearView({model:self.publicModel});
        var scaleHot = 0;
        self.opearView.on('turnR',function(){
          self.showItemView.turn('r');
        }).on('turnL',function(){
        	self.showItemView.turn('l');
        }).on('funScrenn',function(){
          if (screenfull.enabled) {
          	var width = self.layout.itemViewRegion.$el.width(),height = self.layout.itemViewRegion.$el.height();
            screenfull.request(self.showItemView.$el.parent()[0]);
            $(document).on(screenfull.raw.fullscreenchange, function () {
              if(screenfull.isFullscreen){
                setTimeout(function(){
                  self.showItemView.fullscreen();
                },450)
              }else{
                setTimeout(function(){
                  self.showItemView.exitFull(width,height);
                  $(document).unbind(screenfull.raw.fullscreenchange);
                },450)
              }
            });
          }
        }).on('share',function(){
        	var datas = {
        		title:'分享还是转发',
	          tips:'默认信息流中的文字',//默认为空
	          data:{
	          	content:'分享一个文件',
	          	share_info:self.publicModel.toJSON()
	          },
	          type:'share'
        	}
        	Juggler.vent.trigger('forward',datas);
        }).on('zoom',function(){
        	self.showItemView.zoom();
        });
        self.infoView = new JWidgets.docView.init.infoView({model:self.publicModel});
        //评论的问题
        self.commentsView = JWidgets.Comments.main.newComments({
          region: self.layout.commentRegion,
          app_id: self.publicModel.get('id'),
          app_type: 'spms_file',
          state:{pagesize:10000000}
        });
        
        JWidgets.Comments.main.on('comments:new:success',function( model ){
          self.publicModel.set({comments_num: (self.publicModel.get('comments_num')+1) })
        }).on('comments:remove:success',function( model ){
          sself.publicModel.set({comments_num: (self.publicModel.get('comments_num')-1) })
        });
        //评论的问题
        self.layout.infoViewRegion.show(self.infoView);
				self.layout.loadingRegion.reset();
				self.layout.opearRegion.show(self.opearView);
				self.layout.moreViewRegion.show(new JWidgets.docView.init.MoreViews({
          collection: self.collection,
          model:self.publicModel
        }));
				self.layout.itemViewRegion.show(self.showItemView)

			}})
		}
	})

	Juggler.vent.on('docView',function(resp){
		new JWidgets.docView.init.Controller(resp)
	});

	InitDocView = function(options){
		return new JWidgets.docView.init.Controller(options)
	}

})
