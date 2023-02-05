// add to do list script
$(document).on('click','.add-todo',function(){
  let todoInputData= $('.container .todo-input-field').val();
 let todoListData=`<div class="list-parent">
  <div class="list-row">
  <div class="list-data">`+ todoInputData+`</div>
  <div class="edit-todo"><i class="fa-regular fa-pen-to-square"></i></div>
  <div class="remove-todo"><i class="fa-solid fa-xmark"></i></div>
  </div>
  <div class="list-error"></div></div>`;

if(todoInputData !== '')
{
   $('.todo-content .error').hide().text('');
  $('.todo-content .todo-list').append(todoListData);
  $('.container .todo-input-field').val('');
 
}
else{
  $('.todo-content .error').show().text('Please enter the new task');
}
});

// remove todo list script
$(document).on('click','.remove-todo',function(){
 $(this).parent('.list-row').remove();
})

// edit todo list script
$(document).on('click','.edit-todo',function(){
 $(this).attr('class','update-todo').html('<i class="fa-solid fa-check"></i>');
 var listText= $(this).parent('.list-row').find('.list-data').html();
 var listDataHeight=$(this).parent('.list-row').find('.list-data').innerHeight();
 $(this).parent('.list-row').find('.list-data').attr('class','update-data');
 
  $(this).parent('.list-row').find('.update-data').html('<textarea style="height:'+listDataHeight+'px">'+listText+'</textarea>');
 
});
//update todo script
$(document).on('click','.update-todo',function(){
 var listText= $(this).parent('.list-row').find('textarea').val();
 if(listText == '')
  {
   $(this).parents('.list-parent').find('.list-error').show().text('You must enter something!');
  }else{
   $(this).attr('class','edit-todo').html('<i class="fa-regular fa-pen-to-square"></i>');
   $(this).parent('.list-row').find('.update-data').attr('class','list-data');
   var listText= $(this).parent('.list-row').find('.list-data').html(listText);
   $(this).parents('.list-parent').find('.list-error').hide().text('');
}
});

// line through the  todo list 
$(document).on('click','.list-data',function(){
 $(this).toggleClass('line-through');
});