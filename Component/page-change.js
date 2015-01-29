var app = new Marionette.Application();
app.module('PageView',function(PageView,Backbone,Marionette,$,_){

})

app.module('PageView.Data',function(Data,PageView,Backbone,Marionette,$,_){

  this.collection = Backbone.Collection.extend({})

})

app.module('PageView.Templates',function(Templates,PageView,Backbone,Marionette,$,_){

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
  Templates.PageItemView = _.template('<%=num() %>')

})

app.module('PageView.base',function(base,PageView,Backbone,Marionette,$,_){

  this.startWithParent = false;

  this.loadingView = Marionette.ItemView.extend({
    template:'<div class="PageView-loading">正在加载分页信息…</div>'
  })

  this.PageItemView = Marionette.ItemView.extend({
    className:'PageItemView',
    template:app.PageView.Templates.PageItemView,
    templateHelpers:function(){
      return{
        num:function(){
          return parseInt(this.id)+1
        }
      }
    },
    onShow:function(){
      this.$el.attr({'action-id':this.model.get("id")})
      if(this.model.get("active")) this.$el.addClass('active')
    },
    triggers:{
      'click':'ItemClick'
    }
  })

  this.CompositeView = Marionette.CompositeView.extend({
    className:'PageView',
    getTemplate:function(){
      return app.PageView.Templates[this.templateType]
    },
    ui:{
      firstBtn:'.pageView-to-first',
      preBtn:'.pageView-to-pre',
      nextBtn:'.pageView-to-next',
      lastBtn:'.pageView-to-last'
    },
    childViewContainer:'.PageView-c',
    childView:this.PageItemView,
    childEvents:{
      "ItemClick":function(view,arguments){
        this.trigger('changeItem',view,arguments)
      }
    },
    triggers:{
      'click .pageView-to-first':'goFirst',
      'click .pageView-to-pre':'goPre',
      'click .pageView-to-next':'goNext',
      'click .pageView-to-last':'goLast'
    },
    initialize:function(options){
      _.extend(this,options)
    }
  })
  this.Controller = Marionette.Controller.extend({
    initialize:function(options){
      _.extend(this,options);
      this.start();
    },
    start:function(){
      var self = this;
      this.AllPageNum = Math.ceil(this.page['num'] / this.page["pagesize"]);
      this.collection = new app.PageView.Data.collection({id:0});
      this.CompositeView = new base.CompositeView({
        collection: this.collection,
        templateType:this.templateType
      });
      this.CompositeView.on('changeItem',function(view,arguments){
        var num = arguments['model'].get("id");
        if(self.collection.nowNum == num) return
        self.collection.reset(self._init_pageBtn(num))
      }).on('goFirst',function(){
        self.collection.reset(self._init_pageBtn(0))
      }).on('goPre',function(){
        self.collection.reset(self._init_pageBtn(self.collection.nowNum-1));
      }).on('goNext',function(){
        self.collection.reset(self._init_pageBtn(self.collection.nowNum+1));
      }).on('goLast',function(){
        self.collection.reset(self._init_pageBtn(self.AllPageNum-1))
      })
      self.region.show(self.CompositeView);
      this.Btns = this.CompositeView.ui;
      this.collection.on('reset',function(){
        //触发事件
        self.trigger('hahah',this.nowNum);
      })
      this.collection.reset(this._init_pageBtn(0));
    },
    _init_pageBtn:function(num){
      this.collection.nowNum = num;
      var data = []
      if(this.templateType == 'normal'){
        if(num == 0){
          this.Btns.preBtn.attr({disabled:'disabled'});
          this.Btns.nextBtn.removeAttr('disabled');
        }else if(num == this.AllPageNum-1){
          this.Btns.preBtn.removeAttr('disabled');
          this.Btns.nextBtn.attr({disabled:'disabled'});
        }else{
          this.Btns.preBtn.removeAttr('disabled');
          this.Btns.nextBtn.removeAttr('disabled');
        }
        return data;
      }else{
        if(num == 0){
          this.Btns.firstBtn.attr({disabled:'disabled'});
          this.Btns.preBtn.attr({disabled:'disabled'});
          this.Btns.nextBtn.removeAttr('disabled');
          this.Btns.lastBtn.removeAttr('disabled');
        }else if(num == this.AllPageNum-1){
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
        var data = _.map(_.range(0,this.AllPageNum),function(item,index){
          return {id:item,active:(index == num?true:false)}
        })
        return data
      }
    }
  })  
  returnPageView = function(options){
    return new app.PageView.base.Controller(options);
  }
})