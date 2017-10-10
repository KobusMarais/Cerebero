mergeInto(LibraryManager.library, {

  getAccessToken: function () {
    
    var token = localStorage.getItem('accessToken');

    if (token == null)
    	token = "2";

    return token;
  }

});