/////shared functions
function tableMonitor(tableID,cols){
	AJS.$(document).ready(function(){ AJS.$("#edit-"+tableID).change(function(){
		tableResult(tableID,cols);
		});
	});
}

function tableAlign(table){
    if (table.rows.length > 0){
        for (i = 1; i < table.rows.length; i++){
            if (table.rows[i].cells[0].innerHTML != i){
                table.rows[i].cells[0].innerHTML=i;
                table.rows[i].className = (i%2 == 0) ? "even" :null;
                table.rows[i].cells[0].className = (i%2 == 0) ? "even-num" : "num";
            }
        }
    }
}
function rowDel(postfix, colStr){
	var cols = colStr.split(",");
    var table = document.getElementById("edit-"+postfix);
    if (table.rows.length > 0){
        for (i = 1; i < table.rows.length; i++){
            if (table.rows[i].cells[cols.length+1].children[0].checked){
                table.deleteRow(i);
                i--;
            }
        }
    tableAlign(table);
    tableResult(postfix,colStr);
    }
}
function copyCell(Tr, rule, value){
    var Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML = rule;
    Td.children[0].value = value;
}

function rowCopy(postfix, colStr){
	var cols = colStr.split(",");
    var table = document.getElementById("edit-"+postfix);
    var max = table.rows.length;
    if (max > 0){
        for (i = 1; i < max; i++){
            if (table.rows[i].cells[cols.length+1].children[0].checked){
                Tr = table.insertRow(table.rows.length);
                Td = Tr.insertCell(Tr.cells.length); // insert row number
                Td.className = "num";
                for (j = 1; j < cols.length+2; j++){
                    if (j < cols.length+1){
                        copyCell(Tr, table.rows[i].cells[j].innerHTML, table.rows[i].cells[j].children[0].value);
                    }else{
                        addCell(Tr, table.rows[i].cells[j].innerHTML);
                    }
                }
            }
        }
        tableAlign(table);
        tableResult(postfix,colStr);
    }
}

function addCell(Tr, rule){
    var Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML = rule;
}
////////////write table's data back to DB 
function tableResult(postfix,colStr){
	alert("start update "+ colStr);
	var cols = colStr.split(",");
    var table = document.getElementById("edit-"+postfix);;
    var Result ="";
    for ( i = 1; i < table.rows.length; i++){
        var row = table.rows[i];
        var jsonObj = {};
        for ( j = 0; j < cols.length; j++ ){
            jsonObj[cols[j]] = row.cells[j+1].children[0].value;
        }
        Result += JSON.stringify(jsonObj);
        if (i < table.rows.length-1){ //not the last one
            Result+=",";
        }
    }
    if (Result.length > 0){
        document.getElementById("result-"+postfix).value = "{\"rows\":["+Result+"]}";
    }else{
        document.getElementById("result-"+postfix).value = null;
    }
    
    alert("end! with "+Result.length);
}

////////EBS functions
function EBSrowAdd(postfix){
    var cols = [ "type", "mount", "size", "vtype", "iops", "terminate", "encrypted" ];
	var tableObj = document.getElementById("edit-"+postfix);
	var num = tableObj.rows.length;
	var Tr = tableObj.insertRow(num);
	var Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML= num;
	if (num%2==0){
        Tr.className = "even";
        Td.className = "even-num";
    }else{
        Td.className = "num";
    }
	//disk type	
	addCell(Tr, '<select id='+cols[0]+'>\
						<option>Root</option>\
						<option>EBS</option>\
						<option>ephemeral</option>\
		  				</select>');
	//mount point
	addCell(Tr,'/dev/<input id='+cols[1]+' type="text" size="7">');
	//size
	addCell(Tr,'<input id='+cols[2]+' type="number" max="1024" min="0" value="0">');
	//vtype
	addCell(Tr,'<select id='+cols[3]+' >\
					<option>Magnetic</option>\
					<option>General Purpose(SSD)</option>\
					<option>Provisioned IOPS(SSD)</option>\
					</select>');
	//iops
	addCell(Tr,'<input id='+cols[4]+' type="number" max="2000" min="0" value="0">');
	//terminate
	addCell(Tr,'<select id='+cols[5]+'><option>Yes</option><option>No</option></select>');
	//encrypted
	addCell(Tr,'<select id='+cols[6]+'><option>Yes</option><option>No</option></select>');
	
	addCell(Tr,'<input id="selected" type="checkbox">');
}

function EBStableBuild(tableStr, postfix){
    var cols = [ "type", "mount", "size", "vtype", "iops", "terminate", "encrypted" ];
	var tableObj = document.getElementById("edit-"+postfix);
	if ( tableObj == null ){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
		EBSrowAdd(postfix);
		for ( j = 0; j < cols.length; j++ ){
			tableObj.rows[i].cells[j+1].children[0].value = rowArray.rows[i-1][cols[j]];
		}
	}
}

/////////EC2 functions
function EC2rowAdd(postfix){
	var cols=["name","number","ami","type","keyname","publicip","subnet","sg","nat","ebs","userdata"];
	var tableObj = document.getElementById("edit-"+postfix);
	var num = tableObj.rows.length;
	var Tr = tableObj.insertRow(num);
	var Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML= num;
	if (num%2==0){
        Tr.className = "even";
        Td.className = "even-num";
    }else{
        Td.className = "num";
    }
	//Name	
	addCell(Tr, '<input type="text" style="width:60px"  maxlength="32" id='+cols[0]+'>');
	//number of instance
	addCell(Tr, '<input type="number" style="width:40px" value="1" min="1" id='+cols[1]+'>');
	//AMI
	addCell(Tr,'<select style="width:100px" id='+cols[2]+'>\
					<option>Amazon Linux(official)</option>\
					<option>Red Hat 7.0(official)</option>\
					<option>Ubuntu 14.04(official)</option>\
					<option>Amazon Linux(DCS v3)</option>\
					<option>Amazon Linux(DCS v2)</option>\
					<option>CentOS 6.5(DCS v4)</option>\
					<option>CentOS 6.5(DCS v3)</option>\
					</select>');
	//Instance class
	addCell(Tr,'<select style="width:80px" id='+cols[3]+'>\
					<option>t1.micro</option>\
					<option>t2.micro</option>\
					<option>m1.small</option>\
					<option>m3.medium</option>\
					<option>m3.large</option>\
					<option>m3.xlarge</option>\
					<option>m3.2xlarge</option>\
					<option>c1.medium</option>\
					<option>c1.xlarge</option>\
					</select>');
	//keyname
	addCell(Tr,'<input type="text" style="width:50px" id='+cols[4]+'>');
	//pubIP
	addCell(Tr,'<select id='+cols[5]+' style="width:80px">\
                    <option>No need public IP</option>\
                    <option>Auto-assign public IP</option>\
                    <option>Apply elastic IP</option>\
					</select>');
	//subnet
	addCell(Tr,'<input type="text" style="width:80px" id='+cols[6]+'>');
	//security group
	addCell(Tr,'<input type="text" style="width:80px" id='+cols[7]+'>');
	//NAT conf
	addCell(Tr,'<select id='+cols[8]+' style="width:70px">\
                    <option>no use NAT</option>\
                    <option>NAT server</option>\
                    <option>NAT slave</option>\
					</select>');

	//EBS devices
	addCell(Tr,'<input type="text" style="width:40px" id='+cols[9]+'>');
	//userdata	
	addCell(Tr,'<textarea rows="2" cols="10" id='+cols[10]+'>');
	//select
	addCell(Tr,'<input id="selected" type="checkbox">');
}

function EC2tableBuild(tableStr,postfix){
	var cols=["name","number","ami","type","keyname","publicip","subnet","sg","nat","ebs","userdata"];
	var table = document.getElementById("edit-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"').replace(/\n/g,'@@@@@@'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
		EC2rowAdd(postfix);
		for (j = 0; j < cols.length-1; j++ ){
			table.rows[i].cells[j+1].children[0].value = rowArray.rows[i-1][cols[j]];
		}
		table.rows[i].cells[cols.length].children[0].value = rowArray.rows[i-1][cols[cols.length-1]].replace(/@@@@@@/g,'\n');
	}
}
/////////ELB Listeners functions
function ELBLISrowAdd(postfix){
	var cols = ["elbproto","elbport","instproto","instport","oldssl","newssl"];
	var tableObj = document.getElementById("edit-"+postfix);
	var num = tableObj.rows.length;
	var Tr = tableObj.insertRow(num);
	var Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML= num;
	if (num%2==0){
        Tr.className = "even";
        Td.className = "even-num";
    }else{
        Td.className = "num";
    }
	//ELB protocol	
	addCell(Tr, '<select id='+cols[0]+'>\
					<option>HTTP</option>\
					<option>HTTPS</option>\
					<option>TPC</option>\
                    <option>SSL</option>\
					</select>');
	//ELB port
	addCell(Tr, '<input type="number" value="0" min="0" max="65535" id='+cols[1]+'>');
	//Instance protocol
	addCell(Tr,'<select id='+cols[2]+'>\
					<option>HTTP</option>\
					<option>HTTPS</option>\
					<option>TPC</option>\
                    <option>SSL</option>\
					</select>');
	//Instance port
	addCell(Tr, '<input type="number" value="0" min="0" max="65535" id='+cols[3]+'>');
	//exist SSL
	addCell(Tr,'<select style="width:150px" id='+cols[4]+'>\
					<option>---</option>\
					<option>LiveWedding_Wildcard_trendmicro.com</option>\
					<option>Live_Wedding_Wildcard_trendmicro.com</option>\
					<option>LW_WildCard_TrendMicro</option>\
					<option>MARS_Wildcard.trendmicro.com</option>\
					<option>NewTMCert-CCS</option>\
					<option>n_rest.mars.trendmicro.com-2014</option>\
					<option>REST-MARS</option>\
					<option>rest.mars.trendmicro.com-2014</option>\
					<option>sdi.trendmnet.org</option>\
					<option>trendmicro</option>\
					<option>TrendMicro-CCS</option>\
					<option>trendmicro.com</option>\
					<option>Trendmicro2015</option>\
					<option>trendmicro_CCS</option>\
					<option>WFBSS-MobileAAL</option>\
					<option>wfrm</option>\
					<option>use new SSL certificate</option>\
					</select>');
	//new SSL
	addCell(Tr,'<input type="text" value="[new name of certificate]" id='+cols[5]+'>');
	//select
	addCell(Tr,'<input id="selected" type="checkbox">');
}

function ELBLIStableBuild(tableStr,postfix){
	var cols = ["elbproto","elbport","instproto","instport","oldssl","newssl"];
	var table = document.getElementById("edit-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
		ELBLISrowAdd(postfix);
		for (j = 0; j < cols.length; j++ ){
			table.rows[i].cells[j+1].children[0].value = rowArray.rows[i-1][cols[j]];
		}
	}
}
/////////ELB functions
function ELBrowAdd(postfix){
	var cols = ["name","ec2","sg","scheme","ebslis","proto","port","path","timeout","interval","health","unhealth"];	
	var tableObj = document.getElementById("edit-"+postfix);
	var num = tableObj.rows.length;
	var Tr = tableObj.insertRow(num);
	var Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML= num;
	if (num%2==0){
        Tr.className = "even";
        Td.className = "even-num";
    }else{
        Td.className = "num";
    }
	//Name
	addCell(Tr, '<input type="text" style="width:50px"  maxlength="32" id='+cols[0]+'>');	
	//EC2 groups
	addCell(Tr,'<input type="text" style="width:40px" id='+cols[1]+'>');
	//sg ids
	addCell(Tr,'<input type="text" style="width:85px" id='+cols[2]+'>');
	//Scheme
	addCell(Tr, '<select style="width:70px" id='+cols[3]+'><option>Internal</option><option>Internet-facing</option></select>');
	//ebslis
	addCell(Tr,'<input type="text" style="width:40px" id='+cols[4]+'>');
	//proto
	addCell(Tr,'<select style="width:50px" id='+cols[5]+'>\
                    <option>HTTP</option>\
                    <option>HTTPS</option>\
                    <option>TPC</option>\
                    <option>SSL</option>\
                    </select>');
	//port
	addCell(Tr, '<input type="number" value="0" min="0" max="65535" id='+cols[6]+'>');
	//path
	addCell(Tr, '<input type="text" style="width:60px" id='+cols[7]+'>');
	//timeout
	addCell(Tr, '<input type="number" style="width:30px" value="5" id='+cols[8]+'>');
	//interval
	addCell(Tr, '<input type="number" style="width:30px" value="30" id='+cols[9]+'>');
	//health
	addCell(Tr, '<input type="number" style="width:30px" value="10" id='+cols[10]+'>');
	//unhealth
	addCell(Tr, '<input type="number" style="width:30px" value="2" id='+cols[11]+'>');

	//select
	addCell(Tr,'<input id="selected" type="checkbox">');
}

function ELBtableBuild(tableStr,postfix){
	var cols = ["name","ec2","sg","scheme","ebslis","proto","port","path","timeout","interval","health","unhealth"];	
	var table = document.getElementById("edit-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
		ELBrowAdd(postfix);
		for (j = 0; j < cols.length; j++ ){
			table.rows[i].cells[j+1].children[0].value = rowArray.rows[i-1][cols[j]];
		}
	}
}
/////////Subnet functions
function SUBNETrowAdd(postfix){

	var cols = ["name","az","cidr","type","id"];
	var tableObj = document.getElementById("edit-"+postfix);
	var num = tableObj.rows.length;
	var Tr = tableObj.insertRow(num);
	var Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML= num;
	if (num%2==0){
        Tr.className = "even";
        Td.className = "even-num";
    }else{
        Td.className = "num";
    }
	//Name
	addCell(Tr, '<input type="text" style="width:60px" maxlength="32" id='+cols[0]+'>');	
	//AZ
	addCell(Tr,'<select id='+cols[1]+'>\
                    <option>0</option>\
                    <option>1</option>\
                    <option>2</option>\
                    <option>3</option>\
                    </select>');
	//CIDR block
	addCell(Tr, '<input type="text" id='+cols[2]+'>');
	//AZ
	addCell(Tr,'<select id='+cols[3]+'>\
                    <option>Public</option>\
                    <option>Private</option>\
                    </select>');
	//ID
	addCell(Tr, '<input type="text" id='+cols[4]+'>');
	
	//select
	addCell(Tr,'<input id="selected" type="checkbox">');
}

function SUBNETtableBuild(tableStr,postfix){

	var cols = ["name","az","cidr","type","id"];
	var table = document.getElementById("edit-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
		SUBNETrowAdd(postfix);
		for (j = 0; j < cols.length; j++ ){
			table.rows[i].cells[j+1].children[0].value = rowArray.rows[i-1][cols[j]];
		}
	}
}
/////////Security group functions
function SGrowAdd(postfix){

	var cols = ["name","des","rule","protocal","fport","eport","sd","sgid"];
	var tableObj = document.getElementById("edit-"+postfix);
	var num = tableObj.rows.length;
	var Tr = tableObj.insertRow(num);
	var Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML= num;
	if (num%2==0){
        Tr.className = "even";
        Td.className = "even-num";
    }else{
        Td.className = "num";
    }
	//Name
	addCell(Tr, '<input type="text" style="width:50px"  maxlength="32" id='+cols[0]+'>');	
	//Description
	addCell(Tr,'<input type="text" style="width:80px" id='+cols[1]+'>');
	//sg rules
	addCell(Tr,'<select style="width:70px" id='+cols[2]+'><option>Inbound</option><option>Outbound</option></select>');
	//protocal
	addCell(Tr,'<select style="width:60px" id='+cols[3]+'>\
                    <option>TCP</option>\
                    <option>UDP</option>\
                    <option>ICMP</option>\
                    </select>');
	//port start
	addCell(Tr, '<input type="number" style="width:40px" value="0" min="0" max="65535" id='+cols[4]+'>');
	//port end
	addCell(Tr, '<input type="number" style="width:40px" value="0" min="0" max="65535" id='+cols[5]+'>');
	//source/destination
	addCell(Tr, '<input type="text" style="width:60px" id='+cols[6]+'>');
	//ID
	addCell(Tr, '<input type="text" style="width:60px" id='+cols[7]+'>');
	
	//select
	addCell(Tr,'<input id="selected" type="checkbox">');
}

function SGtableBuild(tableStr,postfix){

	var cols = ["name","des","rule","protocal","fport","eport","sd","sgid"];
	var table = document.getElementById("edit-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
		SGrowAdd(postfix);
		for (j = 0; j < cols.length; j++ ){
			table.rows[i].cells[j+1].children[0].value = rowArray.rows[i-1][cols[j]];
		}
	}
}
/////////key value functions
function KVrowAdd(postfix){

	var cols = ["key","value"];
	var tableObj = document.getElementById("edit-"+postfix);
	var num = tableObj.rows.length;
	var Tr = tableObj.insertRow(num);
	var Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML= num;
	if (num%2==0){
        Tr.className = "even";
        Td.className = "even-num";
    }else{
        Td.className = "num";
    }
	//Key
	addCell(Tr, '<input type="text" id='+cols[0]+'>');	
	//Value
	addCell(Tr, '<input type="text" id='+cols[1]+'>');
	//select
	addCell(Tr,'<input id="selected" type="checkbox">');
}

function KVtableBuild(tableStr,postfix){
	var cols = ["key","value"];
	var table = document.getElementById("edit-"+postfix);
	if (table == null){
		return
	}
	var rowArray = JSON.parse(tableStr.replace(/&quot;/g,'"'));
	for ( i = 1 ; i <=rowArray.rows.length; i++ ){
		KVrowAdd(postfix);
		for (j = 0; j < cols.length; j++ ){
			table.rows[i].cells[j+1].children[0].value = rowArray.rows[i-1][cols[j]];
		}
	}
}
