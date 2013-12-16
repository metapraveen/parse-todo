
//MODEL FOR ONE TODO ITEM, HOLDS ALL THE DATA REQUIRED FOR A TODO
define(
['jquery',
'underscore',
'backbone',
'helper'
],

function(
$,
_,
Backbone,
helper
) {

 var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults :{
        id:null,
        title: null,
        done: false
    },

    initialize: function(options){
      $.extend(this,options)
     this.set('id',this.get('objectId'), {silent:true});
    },

    toggle:function() {
      var self = this;
      var prev_done = this.get("done");
      this.save({done: !this.get("done")},
        {
        success:function(){

        },
        error:function(){
            self.set('done',prev_done);
        }
    });
    },

    markComplete:function(value){
        var self = this;
        var prev_done = this.get("done");
        this.save({done: value},
            {
                error:function(){
                    self.set('done', prev_done);
                }
            });
    },

    sync:function(method, model, option){
      var self = this;
      //ON SAVE, SEND A CALL BACK FUNC, WHICH WILL SET OBJECTID AS ID OF CREATED MODEL
      if(method=='create'){
        option.wait = true;
        option.success = function(resp, status, xhr){
           self.id = resp.objectId
           delete self.objectId;
        };
        option.error = function(a, b){
           self.destroy();
        };
      }
      Backbone.sync(method, model, option);
    }

  });

return Todo;

});