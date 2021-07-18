var MyTabModel = Backbone.Collection.extend({
    url: 'data/myplugindata.json'
})

class MyLayout extends allure.components.AppLayout {

    initialize() {
        this.model = new MyTabModel();
    }

    loadData() {
        return this.model.fetch();
    }

    getContentView() {
        return new MyView({items: this.model.models});
    }
}
var globalData;

const template = function (data) {
    globalData = data;
    var html ='<h3 class="pane__title">Manual Test Report</h3>'
    html +='<iframe  id="myframe" style="position: absolute; height: 100%; width: 100%; border: none"></iframe>';
   
    html +='<script>injector();</script>';
    
    
    return html;
}


var attachment = function(i,id,name,attachments){

    var res =`<div id="attachment`+i+id+`" class="modal">
        <div class="modal-content">
        <h6 class="card-panel teal lighten-2">`+name+`</h6>`
        
       

        for(var att of attachments){
            res += '<div  class="card-panel pink lighten-5 eye">'+att.name+'</div>';
            res += '<img class="materialboxed" src="data/attachments/'+att.source+'">';
        }
        res +=`</div>
        <div class="modal-footer">
        <a href="#mytab" class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
    </div>`;
    return res;

}

var steps = function(i,id,name,steps){

    var res =`<div id="steps`+i+id+`" class="modal">
        <div class="modal-content">
        <h6 class="card-panel teal lighten-2">`+name+`</h6>`
        
       
        res += '<table class="striped"><thead><tr><th>Step Description</th><th>Status</th><th>Error Msg</th></thead><tbody>';

        for(var att of steps){
            res += '<tr>';
            res += '<td> ' + att.name +'</td>';
            res += '<td> ' + att.status +'</td>';
            if(att.statusMessage == undefined){
                res += '<td> </td>';
            }else {
                res += '<td> ' + att.statusMessage +'</td>';
            }
            
            res += '</tr>';
        }
        res += '</tbody></table>';
        res +=`</div>
        <div class="modal-footer">
        <a href="#mytab" class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
    </div>`;
    return res;

}



var MyView = Backbone.Marionette.View.extend({
    template: template,

    render: function () {
        this.$el.html(this.template(this.options));
        return this;
    }
})
allure.api.addTab('mytab', {
    title: 'Manual Test', icon: 'fa fa-trophy',
    route: 'mytab',
    onEnter: (function () {
        return new MyLayout()
    })
});

const injector = function() {
    var html ='<html>';
    html +='<head>';
    html +='<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">';
    html +='<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';

    html +='<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>';

    html +=`<style>
 
    .modal {
     
      left: 0;
     
      right: 0;
     
      background-color: #fafafa;
     
      padding: 0;
     
      max-height: 70%;
     
      width: 100%;
     
      will-change: top, opacity;
     
    }</style>`;
    html +='</head>';
    html +='<body>';
    


    html +='<div  style="max-height: 1000px;overflow-y: scroll;">';

    html += '<div>';
    html += ' <ul class="collapsible">';

    var i=0;
    for (var item of globalData.items) {

        html += ' <li>';
        html += '<div class="collapsible-header"><a class="btn-floating right modal-trigger" href="data/attachments/'+item.attributes.name+'.pdf" download"><i class="material-icons">file_download</i></a><table><td>' + item.attributes.name +'</td><td>Passed : '+item.attributes.passed+'</td><td>Failed : '+item.attributes.failed+'</td><td>Not Started: '+item.attributes.notStarted+'</td><td>Not Executed: '+item.attributes.notExecuted+'</td></table></div>';
        html += '<div class="collapsible-body">';
        html += '<table class="striped"><thead><tr><th>Step No</th><th>Description</th><th>Status</th><th>Screenshot</th><th>Steps</th></tr></thead><tbody>';

        var id=3;
        for(var temp of item.attributes.stepList){

            html += '<tr>';
            html += '<td> ' + temp.id +'</td>';
           
            if(temp.status!='passed'){
            	 html += '<td> <strong style="color:red">' + temp.name +'</strong></td>';
                html += '<td ><strong style="color:red">' + temp.status +'</strong></td>';
            }else {
            	 html += '<td> ' + temp.name +'</td>';
                html += '<td>' + temp.status +'</td>';
            }
            html += '<td>  <a class="btn-floating center modal-trigger" href="#attachment'+i+id+'"><i class="material-icons">photo</i></a>' 
            html += attachment(i,id,temp.id+'  '+temp.name,temp.attachments);
            html += '</td>';
            
            html += '<td>  <a class="btn-floating center modal-trigger" href="#steps'+i+id+'"><i class="material-icons">view_list</i></a>' 

            html += steps(i,id,temp.id+'  '+temp.name,temp.steps);

            html += '</td>';
            html += '</tr>';
            id = id+1;
        }
        html += '</tbody></table>';
        html += '</div>';
        i++;
        
    }
    html += ' </ul>';
    html += ` <script>var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems);
    var elems1 = document.querySelectorAll('.modal');
    var instances1 = M.Modal.init(elems1);
    </script>`;
    html += ' </div>';


    document.getElementById('myframe')
        .contentDocument.write(html);

  };


