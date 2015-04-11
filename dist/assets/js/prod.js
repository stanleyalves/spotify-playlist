(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Test = require('./modules/commentBox');

(function() {
	console.log('JS working');
	
})();



},{"./modules/commentBox":2}],2:[function(require,module,exports){

var converter = new Showdown.converter();

function extend() {
  var args = [].slice.call(arguments),
      ret = args[0];
  for (var i = 1, len = args.length; i < len; i++) {
      var obj = args[i];
      for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) ret[prop] = obj[prop];
      }
  }
  return ret;
}
function ajax (opts) {
  var args = extend({
      url : undefined,
      dataType : 'text',
      data : '',
      cache : true,
      success : function(r) {},
      error : function(r) {},
      method : 'GET',
      async : true
  }, opts);

  if (!args.url) return;
  if (args.method === 'GET' && !args.cache) args.data += '_=' + new Date().getTime();

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      var rs = xhr.readyState;
      if (rs < 4) return;
      if (rs === 4) {
          if (xhr.status !== 200 && xhr.status !== 0) {
              args.error.call(this, xhr.responseText);
              return;
          }
          switch (args.dataType)
          {
              case 'text':
              case 'html':
              case 'script':
                  args.success.call(this, xhr.responseText);
              break;
              case 'json':
                  args.success.call(this, JSON.parse(xhr.responseText));
              break;
              case 'xml':
                  args.success.call(this, xhr.responseXML);
              break;
          }
      }
  };
  xhr.onerror = function() {
      args.error.call(this, xhr.responseText);
  };
  xhr.open(args.method, args.url, args.async);
  if (args.method === 'POST') {
  	xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  	args.data = args.data instanceof Object ? JSON.stringify(args.data) : args.data;
  }
  xhr.send(args.data);
}

var CommentBox = React.createClass({displayName: "CommentBox",

	loadCommentsFromServer: function() {
		{
			/*
			* This AJAX in the data from the JSON.
			* Callback will refer to the function we pass to ajax when we call it and we simply pass it on to success. I.e. once the AJAX request is successful, function ajax will call callback and pass the response to the callback (which can be referred to with result, since this is how we defined the callback).		
			*/
		}
		
		ajax({
			url: this.props.url,
			method:'GET',
			success: function(data){
				console.log(this);
				console.log(data)
				var respText = JSON.parse(data);
				this.setState({ data: respText });
			}.bind(this)
		});

  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    console.log(comment);
    comments.push(comment);
    this.setState({data: comments}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
			ajax({
				url: this.props.url,
				method:'POST',
				dataType: 'json',
				success: function(data){
					this.setState({data: data});
				}.bind(this),
				data : comment
			});

    });
  },

  getInitialState: function() {
  	{
	  	/*
			* Sets the initial state of data to an empty array.
			* getInitialState() executes exactly once during the lifecycle
			*  of the component and sets up the initial state of the component.
			*/
		}
    return {data: []};
  },
  componentDidMount: function() {
  	{
  		/* Here, componentDidMount is a method called automatically 
  			by React when a component is rendered. The key to dynamic updates
  		 	is the call to this.setState(), which is called by loadCommentsFromServer.
  		 	We replace the old array of comments with the new one from the server
  		 	and the UI automatically updates itself.
  		*/
  	}
    this.loadCommentsFromServer();
    {
  		/* the AJAX call to a separate method and call it when
  			the component is first loaded and every 2 seconds after that.
  		*/
  	}
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.state.data}), 
        React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
      )
    );
  }
});

//This is the new comment list component.
//It will loop over the data array and create the comments for each array value. 
//It uses .map //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//The current object in the array is passed in as 'comment';
var CommentList = React.createClass({displayName: "CommentList",
	render: function(){
		{/*
		* First get the comments from the data, using .map to loop over them and create
		* the comments.
		*/
		}
		var commentNodes = this.props.data.map(function (comment){
			return (
				React.createElement(Comment, {author: comment.author}, 
					comment.text
				)
			)
		});	
		return (

			React.createElement("div", {className: "commentList"}, 
				commentNodes
			)
		)	
	}
});

var CommentForm = React.createClass({displayName: "CommentForm",

	handleSubmit: function(e){
		e.preventDefault();
		var author = React.findDOMNode(this.refs.author).value.trim();
		var text = React.findDOMNode(this.refs.text).value.trim();

		if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({
    															author:author,
    															text:text
    	 												})
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
	},

	render: function(){
		return (
			React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
        React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
		)
	}
});


//This is the Comment component
var Comment = React.createClass({displayName: "Comment",
	render: function() {
		var rawMarkup = converter.makeHtml(this.props.children.toString());
		return (
			React.createElement("div", {className: "comment"}, 
				React.createElement("h2", {className: "commentAuthor"}, 
					this.props.author
				), 
				React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
			)
		)
	}
});


//This is the React render function which renders your App. 
//It is pasing in the data array into the comment box which will filter down into child
//components
React.render(
  React.createElement(CommentBox, {url: "/assets/data/comments.json", pollInterval: 2000}), document.body
);





},{}]},{},[1]);