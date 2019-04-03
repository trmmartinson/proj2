	 var tabledata = [
		 {id:1, name:"Oli Bob", progress:12, gender:"male", rating:1, col:"red", dob:"14/04/1984", car:1, lucky_no:5, lorem:"Lorem ipsum dolor sit amet, elit consectetur adipisicing "},
		 {id:2, name:"Mary May", progress:1, gender:"female", rating:2, col:"blue", dob:"14/05/1982", car:true, lucky_no:10, lorem:"Lorem ipsum dolor sit amet, elit consectetur adipisicing "},
		 {id:3, name:"Christine Lobowski", progress:42, gender:"female", rating:0, col:"green", dob:"22/05/1982", car:"true", lucky_no:12, lorem:"Lorem ipsum dolor sit amet, elit consectetur adipisicing "},
		 {id:4, name:"Brendon Philips", progress:100, gender:"male", rating:1, col:"orange", dob:"01/08/1980", lucky_no:18, lorem:"Lorem ipsum dolor sit amet, elit consectetur adipisicing "},
		 {id:5, name:"Margret Marmajuke", progress:16, gender:"female", rating:5, col:"yellow", dob:"31/01/1999", lucky_no:33, lorem:"Lorem ipsum dolor sit amet, elit consectetur adipisicing "},
		 {id:6, name:"Frank Harbours", progress:38, gender:"male", rating:4, col:"red", dob:"12/05/1966", car:1, lucky_no:2, lorem:"Lorem ipsum dolor sit amet, elit consectetur adipisicing "},
		 {id:7, name:"Jamie Newhart", progress:23, gender:"male", rating:3, col:"green", dob:"14/05/1985", car:true, lucky_no:63, lorem:"Lorem ipsum dolor sit amet, elit consectetur adipisicing "},
		 {id:8, name:"Gemma Jane", progress:60, gender:"female", rating:0, col:"red", dob:"22/05/1982", car:"true", lucky_no:72, lorem:"Lorem ipsum dolor sit amet, elit consectetur adipisicing "},
		 {id:9, name:"Emily Sykes", progress:42, gender:"female", rating:1, col:"maroon", dob:"11/11/1970", lucky_no:44, lorem:"Lorem ipsum dolor sit amet, elit consectetur adipisicing "},
		 {id:10, name:"James Newman", progress:73, gender:"male", rating:5, col:"red", dob:"22/03/1998", lucky_no:9, lorem:"Lorem ipsum dolor sit amet, elit consectetur adipisicing "},
		 ];

		$("#example-table-sorting").tabulator({
		     columns:[
		     {title:"Name", field:"name", width:200},
		     {title:"Progress", field:"progress", align:"right"},
		     {title:"Gender", field:"gender", sorter:"string"},
		     {title:"Rating", field:"rating",  align:"center", width:100},
		     {title:"Favourite Color", field:"col", sortable:false, sorter:function(a,b){
		         return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
		     }},
		     {title:"Date Of Birth", field:"dob", sorter:"date", align:"center"},
		     {title:"Driver", field:"car", align:"center", sorter:"boolean"},
		     ],
			height: "100%",
			width: "50%",
			pagination:"local",
			paginationSize:5,
			layout:"fitColumns",
			responsiveLayout:true,
		 });

		$("#example-table-sorting").tabulator("setData", tabledata);