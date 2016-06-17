// 通过npm包的方式引入接口

let TestFactory = function () {
  const user = {};

  let getData = () => {
  	var def = $.Deferred();

  	setTimeout(function(){
  		def.resolve({});
  	}, 1000);	

  	console.log(def)

  	return def;
  };

  return { getData };
};

export default TestFactory;
