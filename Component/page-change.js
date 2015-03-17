var app = new Marionette.Application();

JWidgets.module('PageView',function(PageView,Backbone,Marionette,$,_){

})

JWidgets.module('PageView.Data',function(Data,PageView,Backbone,Marionette,$,_){
    this.collection = Backbone.Collection.extend({})
})

JWidgets.module('PageView.Templates',function(Templates,PageView,Backbone,Marionette,$,_){
    Templates.normal = _.template('<div class="PageView-w">\
                    <button class="pageView-to-pre" type="button">&lsaquo;</button>\
                    <div class="PageView-c"></div>\
                    <button class="pageView-to-next" type="button">&rsaquo;</button>\
                  </div>')
    Templates.numTemplate = _.template('<div class="PageView-w">\
                    <button class="pageView-to-first" type="button">&laquo;</button>\
                    <button class="pageView-to-pre" type="button">&lsaquo;</button>\
                    <div class="PageView-c"></div>\
                    <button class="pageView-to-next" type="button">&rsaquo;</button>\
                    <button class="pageView-to-last" type="button">&raquo;</button>\
                  </div>')
    Templates.moreTemplate = _.template('<div class="PageView-w"><button class="pageView-to-more" type="button">加载更多</button><div class="PageView-c"></div></div>')
    Templates.PageItemView = _.template('<%=num() %>')



    Templates.two = _.template('<div class="PageView-w"><button class="pageView-to-more" type="button">加载更多</button><div class="PageView-c"></div></div>')
    Templates.there = _.template('<div class="PageView-w">\
                    <button class="pageView-to-pre" type="button">&lsaquo;</button>\
                    <div class="PageView-c"></div>\
                    <button class="pageView-to-next" type="button">&rsaquo;</button>\
                  </div>')
    Templates.four = _.template('<div class="PageView-w">\
                    <button class="pageView-to-first" type="button">&laquo;</button>\
                    <button class="pageView-to-pre" type="button">&lsaquo;</button>\
                    <div class="PageView-c"></div>\
                    <button class="pageView-to-next" type="button">&rsaquo;</button>\
                    <button class="pageView-to-last" type="button">&raquo;</button>\
                  </div>')

})

//JWidgets.module('PageView.base',function(base,PageView,Backbone,Marionette,$,_){
//
//  this.startWithParent = false;
//
//  this.loadingView = Marionette.ItemView.extend({
//    template:'<div class="PageView-loading">正在加载分页信息…</div>'
//  })
//
//  this.PageItemView = Marionette.ItemView.extend({
//    className:'PageItemView',
//    template:JWidgets.PageView.Templates.PageItemView,
//    templateHelpers:function(){
//      return{
//        num:function(){
//          return parseInt(this.id)+1
//        }
//      }
//    },
//    onShow:function(){
//      this.$el.attr({'action-id':this.model.get("id")});
//      if(this.model.get("active")) this.$el.addClass('active');
//    },
//    triggers:{
//      'click':'ItemClick'
//    }
//  })
//
//  this.CompositeView = Marionette.CompositeView.extend({
//    className:'PageView',
//    getTemplate:function(){
//      return JWidgets.PageView.Templates[this.templateType]
//    },
//    ui:{
//      firstBtn:'.pageView-to-first',
//      preBtn:'.pageView-to-pre',
//      nextBtn:'.pageView-to-next',
//      lastBtn:'.pageView-to-last',
//      moreBtn:'.pageView-to-more'
//    },
//    childViewContainer:'.PageView-c',
//    childView:this.PageItemView,
//    childEvents:{
//      "ItemClick":function(view,arguments){
//        this.trigger('changeItem',view,arguments)
//      }
//    },
//    triggers:{
//      'click .pageView-to-first':'goFirst',
//      'click .pageView-to-pre':'goPre',
//      'click .pageView-to-next':'goNext',
//      'click .pageView-to-last':'goLast',
//      'click .pageView-to-more':'goNext'
//    },
//    initialize:function(options){
//      _.extend(this,options);
//    }
//  })
//  this.Controller = Marionette.Controller.extend({
//    initialize:function(options){
//      _.extend(this,options);
//      this.AllPageNum = Math.ceil(this.dataCollection.datas['num'] / parseInt(this.dataCollection.datas["pagesize"]));
//      if(this.templateType !='scroll'){
//        this.start();
//        this.bindEvt();
//      }else{
//        this._init_scroll();
//      }
//    },
//    bindEvt:function(){
//      var self = this;
//      this.dataCollection.off("fetch:success").on('fetch:success',function(){
//        self.fetching = false;
//        var num =  Math.ceil(this.datas['num'] / parseInt(this.datas["pagesize"]));
//        if(self.templateType == 'moreTemplate') self.Btns.moreBtn.html('加载更多').removeAttr('disabled');
//        if(self.AllPageNum != num){
//          self.AllPageNum = num;
//          if(self.templateType!='scroll') self._init_pageBtn(this.datas["pageno"]);
//        }
//      })
//      this.on('goFetch',function(){
//        self.fetching = true;
//        if(self.templateType == 'moreTemplate') this.Btns.moreBtn.html('加载中…').attr({disabled:'disabled'});
//      })
//    },
//    start:function(){
//      var self = this;
//      this.collection = new JWidgets.PageView.Data.collection();
//      if(this.scrollContainr) this.scrollContainr.off('scroll')
//      this.CompositeView = new base.CompositeView({
//        collection: this.collection,
//        templateType:this.templateType
//      });
//      this.CompositeView.on('changeItem',function(view,arguments){
//        var num = arguments['model'].get("id");
//        if(self.collection.nowNum == num) return
//        self.fetchData(self._init_pageBtn(num));
//      }).on('goFirst',function(){
//        self.fetchData(self._init_pageBtn(0));
//      }).on('goPre',function(){
//        self.fetchData(self._init_pageBtn(parseInt(self.collection.nowNum)-1));
//      }).on('goNext',function(){
//        self.fetchData(self._init_pageBtn(parseInt(self.collection.nowNum)+1));
//      }).on('goLast',function(){
//        self.fetchData(self._init_pageBtn(self.AllPageNum-1));
//      })
//      self.region.show(self.CompositeView);
//      this.Btns = this.CompositeView.ui;
//      this.collection.reset(this._init_pageBtn(0));
//      this.collection.on('reset',function(){
//        self.trigger('goFetch',this.nowNum);
//      })
//      if(this.AllPageNum <= 1) this.region.$el.addClass('hide')
//    },
//    _init_pageBtn:function(num){
//      num = parseInt(num)
//      this.collection.nowNum = num;
//      var data = []
//      if(this.templateType == 'normal'){
//        if(num == 0){
//          this.Btns.preBtn.attr({disabled:'disabled'});
//          this.Btns.nextBtn.removeAttr('disabled');
//        }else if(num == this.AllPageNum-1){
//          this.Btns.preBtn.removeAttr('disabled');
//          this.Btns.nextBtn.attr({disabled:'disabled'});
//        }else{
//          this.Btns.preBtn.removeAttr('disabled');
//          this.Btns.nextBtn.removeAttr('disabled');
//        }
//        return data;
//      }else if(this.templateType == 'numTemplate'){
//        if(num == 0){
//          this.Btns.firstBtn.attr({disabled:'disabled'});
//          this.Btns.preBtn.attr({disabled:'disabled'});
//          this.Btns.nextBtn.removeAttr('disabled');
//          this.Btns.lastBtn.removeAttr('disabled');
//        }else if(num == this.AllPageNum-1){
//          this.Btns.firstBtn.removeAttr('disabled');
//          this.Btns.preBtn.removeAttr('disabled');
//          this.Btns.nextBtn.attr({disabled:'disabled'});
//          this.Btns.lastBtn.attr({disabled:'disabled'});
//        }else{
//          this.Btns.firstBtn.removeAttr('disabled');
//          this.Btns.preBtn.removeAttr('disabled');
//          this.Btns.nextBtn.removeAttr('disabled');
//          this.Btns.lastBtn.removeAttr('disabled');
//        }
//        if(this.AllPageNum<7){
//            data = _.map(_.range(0,(this.AllPageNum<7?this.AllPageNum:7)),function(item,index){
//              return {id:item,active:(index == num?true:false)}
//            })
//        }else{
//          var leftNums = 0;
//          var rightNums = 0;
//          if(num<3){
//            leftNums = 0;
//            rightNums = 7;
//          }else if(num>=this.AllPageNum-3){
//            leftNums = this.AllPageNum-7
//            rightNums = this.AllPageNum
//          }else{
//            leftNums = num-3;
//            rightNums = num+4
//          }
//          data = _.map(_.range(leftNums,rightNums),function(item,index){
//            return {id:item,active:(item == num?true:false)}
//          })
//        }
//        return data
//      }else{
//        if(num == this.AllPageNum-1){
//          this.Btns.moreBtn.addClass('hide')
//        }else{
//          this.Btns.moreBtn.removeClass('hide');
//        }
//      }
//    },
//    _init_scroll:function(){
//      var time;
//      var self = this;
//      this.scrollContainr.on("scroll",function(){
//        var clientH = document.documentElement.clientHeight || document.body.clientHeight;
//        var contentH = $(document).height();
//        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//        if(clientH + scrollTop > contentH - 100){
//          clearTimeout(time)
//          time = setTimeout(function(){
//            if(self.fetching) return
//            else{
//              var nowNum = parseInt(self.dataCollection.datas['pageno'])
//              if(nowNum < self.AllPageNum-1) self.trigger('goFetch',nowNum+1)
//              else self.trigger('noFetch')
//            };
//          },400)
//        }
//      })
//    },
//    fetchData:function(num){
//      if(this.fetching) return
//      else{
//        this.collection.reset(num)
//      }
//    }
//  })
//  this.returnPageView = function(options){
//    if(!Juggler.Config.DEV){
//      options['scrollType'] = 'there';
//      return new JWidgets.PageView.review.Controller(options);
//    }else return new JWidgets.PageView.base.Controller(options);
//  }
//})

JWidgets.module('PageView.review',function(review,PageView,Backbone,Marionette,$,_){
    this.startWithParent = false;
    this.loadingView = Marionette.ItemView.extend({
        template:'<div class="PageView-loading">正在加载分页信息…</div>'
    });
    this.Controller = Marionette.LayoutView.extend({
        className:'PageView',
        events:{
            'click .pageView-to-first':'goFirst',
            'click .pageView-to-pre':'goPre',
            'click .pageView-to-next':'goNext',
            'click .pageView-to-last':'goLast',
            'click .pageView-to-more':'goNext'
        },
        initialize:function(options){
            /*
             * options = {
             *    data:{pageno,pagesize,num},
             *    scrollType one:scroll  two:moreBtn  there:normalPage,four:complexPage,
             *    scrollContainer: 跟scrollType = 1搭配使用
             * }
             */
            _.extend(this,options);
            this.page = this.dataCollection.datas;
            this.num = 1;
            // TODO 判断当前具备分页的条件否
            console.log(this.page,(this.page["pageno"]+1)*this.page['pagesize'],this.page['num']);
            if((this.page["pageno"]+1)*this.page['pagesize'] >= this.page['num']){
                return
            }else{
                this.AllPageNum = Math.ceil(this.page['num'] / this.page['pagesize']);
                this._init_page();
                this.bindEvt();
            }
        },
        ui:{
            firstBtn:'.pageView-to-first',
            preBtn:'.pageView-to-pre',
            nextBtn:'.pageView-to-next',
            lastBtn:'.pageView-to-last',
            moreBtn:'.pageView-to-more'
        },
        regions:{
            Numcontainer:'.PageView-c'
        },
        getTemplate:function(){
            return JWidgets.PageView.Templates[this.scrollType];
        },
        _init_page:function(){
            if(this.scrollType == 'one'){
                this._init_scroll();
            }else if(this.scrollType == 'two'){
                this._init_morePage();
            }else if(this.scrollType == 'there'){
                this._init_normalPage();
            }else{
                this._init_complexPage();
            }
        },
        _init_scroll:function(){
            var self = this;
            var AllPageNum = parseInt(this.page['num'] / (this.page["pageno"]+1*this.page['pagesize']));
            this.scrollContainr.on("scroll",function(){
                var clientH = document.documentElement.clientHeight || document.body.clientHeight;
                var contentH = $(document).height();
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(clientH + scrollTop > contentH - 100){
                    clearTimeout(time)
                    time = setTimeout(function(){
                        if(self.fetching) return
                        else{
                            var nowNum = parseInt(self.dataCollection.datas['pageno']);
                            if(nowNum < self.AllPageNum-1) self.trigger('goFetch',nowNum+1);
                            else self.trigger('noFetch');
                        };
                    },400)
                }
            })
        },
        _init_morePage:function(){
            this.region.show(this);
        },
        _init_normalPage:function(){
            this.region.show(this);
            this.changeBtn();
        },
        _init_complexPage:function(){
            this.region.show(this);
            this.changeBtn();
        },
        goFirst:function(){
            this.num = 1;
            this.trigger('goFetch',1);
            this.changeBtn();
        },
        goPre:function(){
            this.num = this.num - 1;
            this.trigger('goFetch',this.num - 1);
            this.changeBtn();
        },
        goNext:function(){
            this.num = this.num + 1 ;
            this.trigger('goFetch',this.num -+1);
            this.changeBtn();
        },
        goLast:function(){
            this.num = this.AllPageNum;
            this.trigger('goFetch',this.AllPageNum);
            this.changeBtn();
        },
        changeBtn:function(){
            var self = this;
            var num = this.num;
            if(this.scrollType == 'there'){
                if(num == 1){
                    this.Btns.preBtn.attr({disabled:'disabled'});
                    this.Btns.nextBtn.removeAttr('disabled');
                }else if(num == this.AllPageNum){
                    this.Btns.preBtn.removeAttr('disabled');
                    this.Btns.nextBtn.attr({disabled:'disabled'});
                }else{
                    this.Btns.preBtn.removeAttr('disabled');
                    this.Btns.nextBtn.removeAttr('disabled');
                }
            }else if(this.scrollType == 'four'){
                if(num == 1){
                    this.Btns.firstBtn.attr({disabled:'disabled'});
                    this.Btns.preBtn.attr({disabled:'disabled'});
                    this.Btns.nextBtn.removeAttr('disabled');
                    this.Btns.lastBtn.removeAttr('disabled');
                }else if(num == this.AllPageNum){
                    this.Btns.firstBtn.removeAttr('disabled');
                    this.Btns.preBtn.removeAttr('disabled');
                    this.Btns.nextBtn.attr({disabled:'disabled'});
                    this.Btns.lastBtn.attr({disabled:'disabled'});
                }else{
                    this.Btns.firstBtn.removeAttr('disabled');
                    this.Btns.preBtn.removeAttr('disabled');
                    this.Btns.nextBtn.removeAttr('disabled');
                    this.Btns.lastBtn.removeAttr('disabled');
                }
                if(this.AllPageNum<7){
                    data = _.map(_.range(1,(this.AllPageNum<7?this.AllPageNum:7)+1),function(item,index){
                        return {id:item,active:(item == num?true:false)}
                    })
                }else{
                    var leftNums = 0;
                    var rightNums = 0;
                    if(num<3){
                        leftNums = 0;
                        rightNums = 7;
                    }else if(num>=this.AllPageNum-3){
                        leftNums = this.AllPageNum-7
                        rightNums = this.AllPageNum
                    }else{
                        leftNums = num-3;
                        rightNums = num+4
                    }
                    data = _.map(_.range(leftNums+1,rightNums+1),function(item,index){
                        return {id:item,active:(item == num?true:false)}
                    })
                }
                this.$el.find(this.Numcontainer.el).html(_.map(data,function(item){
                    return '<div class="PageItemView '+(item['active']&&item['active']==true?'active':'')+'">'+item['id']+'</div>'
                }).join(''))
            }else if(this.scrollType == 'two'){
                if(num == this.AllPageNum){
                    this.Btns.moreBtn.addClass('hide')
                }else{
                    this.Btns.moreBtn.removeClass('hide');
                }
            }
        },
        bindEvt:function(){
            var self = this;
            this.dataCollection.off("fetch:success").on('fetch:success',function(){
                self.fetching = false;
                if(self.scrollType == 'two') self.Btns.moreBtn.html('加载更多').removeAttr('disabled');
            })
            this.on('goFetch',function(){
                self.fetching = true;
                if(self.scrollType == 'two') this.Btns.moreBtn.html('加载中…').attr({disabled:'disabled'});
            })
        },
        onShow:function(){
            this.Btns = this.ui;
        }
    })
    this.returnPageView = function(options){
        return new JWidgets.PageView.review.Controller(options);
    }
})