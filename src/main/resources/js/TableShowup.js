////////EBS functions
function EBStableShow(tableStr, postfix){
	var cols = [ "type", "mount", "size", "vtype", "iops", "terminate", "encrypted" ];
	var tableObj = document.getElementById("view-"+postfix);
	if ( tableObj == null ){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
   		var Tr = tableObj.insertRow(tableObj.rows.length);
		addCell(Tr, tableObj.rows.length-1);
		for ( j = 0; j < cols.length; j++ ){
			addCell(Tr, rowArray.rows[i-1][cols[j]]);
		}
	}
}

/////////EC2 functions
function EC2tableShow(tableStr,postfix){
	var cols=["name","number","ami","type","keyname","publicip","subnet","sg","nat","ebs","userdata"];
	var table = document.getElementById("view-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"').replace(/\n/g,'@@@@@@'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
    	var Tr = tableObj.insertRow(tableObj.rows.length);
		addCell(Tr, tableObj.rows.length-1);
		for (j = 0; j < cols.length-1; j++ ){
			addCell(Tr, rowArray.rows[i-1][cols[j]]);
		}
		addCell(Tr,rowArray.rows[i-1][cols[cols.length-1]].replace(/@@@@@@/g,'\n'))
	}
}
/////////ELB Listeners functions
function ELBLIStableShow(tableStr,postfix){
	var cols = ["elbproto","elbport","instproto","instport","oldssl","newssl"];
	var table = document.getElementById("view-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
    	var Tr = tableObj.insertRow(tableObj.rows.length);
		addCell(Tr, tableObj.rows.length-1);
		for (j = 0; j < cols.length; j++ ){
			addCell(Tr, rowArray.rows[i-1][cols[j]]);
		}
	}
}
/////////ELB functions
function ELBtableShow(tableStr,postfix){
	var cols = ["name","ec2","sg","scheme","ebslis","proto","port","path","timeout","interval","health","unhealth"];	
	var table = document.getElementById("view-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
    	var Tr = tableObj.insertRow(tableObj.rows.length);
		addCell(Tr, tableObj.rows.length-1);
		for (j = 0; j < cols.length; j++ ){
			addCell(Tr, rowArray.rows[i-1][cols[j]]);
		}
	}
}
/////////Subnet functions
function SUBNETtableShow(tableStr,postfix){

	var cols = ["name","az","cidr","type","id"];
	var table = document.getElementById("view-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
    	var Tr = tableObj.insertRow(tableObj.rows.length);
		addCell(Tr, tableObj.rows.length-1);
		for (j = 0; j < cols.length; j++ ){
			addCell(Tr, rowArray.rows[i-1][cols[j]]);
		}
	}
}
/////////Security group functions
function SGtableShow(tableStr,postfix){
	var cols = ["name","des","rule","protocal","fport","eport","sd","sgid"];
	var table = document.getElementById("view-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
    	var Tr = tableObj.insertRow(tableObj.rows.length);
		addCell(Tr, tableObj.rows.length-1);
		for (j = 0; j < cols.length; j++ ){
			addCell(Tr, rowArray.rows[i-1][cols[j]]);
		}
	}
}
/////////key value functions
function KVtableShow(tableStr,postfix){
	var cols = ["key","value"];
	var table = document.getElementById("view-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
    	var Tr = tableObj.insertRow(tableObj.rows.length);
		addCell(Tr, tableObj.rows.length-1);
		for (j = 0; j < cols.length; j++ ){
			addCell(Tr, rowArray.rows[i-1][cols[j]]);
		}
	}
}
