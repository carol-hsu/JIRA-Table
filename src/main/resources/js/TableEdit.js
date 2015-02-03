AJS.toInit(function(){});

//dealing inline edit and quick edit dialog
AJS.$(function(){
	JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED, function(e, context, reason){
		var context = AJS.$(context);
		if (reason == JIRA.CONTENT_ADDED_REASON.dialogReady || reason == JIRA.CONTENT_ADDED_REASON.inlineEditStarted ){
			//check if key-value table existed
			var KVid = jQuery("#KVid", context).html();
			if (KVid != null){
				var KVvalue = jQuery("#KVvalue", context).html();
				var KVcols = "key,value";
				tableMonitor(KVid,KVcols);
				KVtableBuild(KVvalue,KVid);
			}
			
			//check if EBS table existed
			var EBSid = jQuery("#EBSid", context).html();
			if (EBSid != null){
				var EBSvalue = jQuery("#EBSvalue", context).html();
				var EBScols = "type,mount,size,vtype,iops,terminate,encrypted";
				tableMonitor(EBSid,EBScols);
				EBStableBuild(EBSvalue,EBSid);
			}
			
			//check if EC2 table existed
			var EC2id = jQuery("#EC2id", context).html();
			if (EC2id != null){
				var EC2value = jQuery("#EC2value", context).html();
				var EC2cols = "name,number,ami,type,keyname,publicip,subnet,sg,nat,ebs,userdata";
				tableMonitor(EC2id,EC2cols);
				EC2tableBuild(EC2value,EC2id);
			}
			
			//check if ELBLIS table existed
			var ELBLISid = jQuery("#ELBLISid", context).html();
			if (ELBLISid != null){
				var ELBLISvalue = jQuery("#ELBLISvalue", context).html();
				var ELBLIScols = "elbproto,elbport,instproto,instport,oldssl,newssl";
				tableMonitor(ELBLISid,ELBLIScols);
				ELBLIStableBuild(ELBLISvalue,ELBLISid);
			}
			
			//check if ELB table existed
			var ELBid = jQuery("#ELBid", context).html();
			if (ELBid != null){
				var ELBvalue = jQuery("#ELBvalue", context).html();
				var ELBcols = "name,ec2,sg,scheme,ebslis,proto,port,path,timeout,interval,health,unhealth";
				tableMonitor(ELBid,ELBcols);
				ELBtableBuild(ELBvalue,ELBid);
			}
			
			//check if SUBNET table existed
			var SUBNETid = jQuery("#SUBNETid", context).html();
			if (SUBNETid != null){
				var SUBNETvalue = jQuery("#SUBNETvalue", context).html();
				var SUBNETcols = "name,az,cidr,type,id";
				tableMonitor(SUBNETid,SUBNETcols);
				SUBNETtableBuild(SUBNETvalue,SUBNETid);
			}
			
			//check if SG table existed
			var SGid = jQuery("#SGid", context).html();
			if (SGid != null){
				var SGvalue = jQuery("#SGvalue", context).html();
				var SGcols = "name,des,rule,protocal,fport,eport,sd,sgid";
				tableMonitor(SGid,SGcols);
				SGtableBuild(SGvalue,SGid);
			}
			
		}
	});
});