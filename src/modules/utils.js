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
  xhr.onreadystatechange = () => {
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
  xhr.onerror = () => {
      args.error.call(this, xhr.responseText);
  };
  xhr.open(args.method, args.url, args.async);
  if (args.method === 'POST') {
  	xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  	args.data = args.data instanceof Object ? JSON.stringify(args.data) : args.data;
  }
  xhr.send(args.data);
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default { extend, ajax, isEmpty };  
