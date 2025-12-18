# Aws_EC2_Metrics_Extraction_WF workflow 

##  Purpose & Usage  
This workflow is designed to collect all required metrics(pre-defined metrics list-user can update it based on their requirement) from AWS CloudWatch and outputs the raw metrics for each instance. It includes metrics gathered by the CloudWatch agent, along with custom metrics and default metrics from the namespace.

This workflow retrieves all necessary metrics from AWS CloudWatch and outputs the raw metrics for each EC2 instance.
 
It gathers:

 1.Metrics identified by the CloudWatch Agent.

 2.Custom metrics pushed by scripts or applications.

 3.Default metrics available under the CloudWatch namespace.


Usage

 1.Ensure the CloudWatch Agent is installed and running on your EC2 instances.

 2.Configure the workflow with the required CloudWatch namespace(s).

 3.Run the workflow to fetch metrics.

 4.Raw metrics will be emitted per instance for downstream use.


## Prerequisites for Workflow Execution  

1.CloudWatch Agent installed for collecting and publishing custom/OS-level metrics.

 Reference - cloud watch agent installation and set up - https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html
  
  sample cloud watch agent configuration file

   <img width="764" alt="Screenshot 2025-09-11 at 8 39 08 PM" src="https://github.ibm.com/roja/concert-workflows/assets/470273/bfffde56-a121-4daf-8882-b23f7d8118b5">

   <img width="657" alt="Screenshot 2025-09-11 at 8 39 15 PM" src="https://github.ibm.com/roja/concert-workflows/assets/470273/86ec08c6-20d9-4e88-90eb-9b29f1adcb16">




  
2.IAM Role/Policy attached to the EC2 instance (or IAM user) with permissions for the CloudWatch Agent to push metrics.

3.Inputs to the Workflow

    A. aws_auth - AWS authentication used to pull metrics from CloudWatch.
    B. aws_region - AWS region
    C. namespace - Specifies the CloudWatch namespace from which metrics are retrieved
    D. Instance_Id_list - Defines the list of instance IDs from which metrics are collected.
    E. startTimestamp- Start time (in epoch format)
    F. endTimestamp - End time (in epoch format)

aws-auth

![image](https://github.ibm.com/roja/concert-workflows/assets/470273/183b3fcb-6636-4444-8e12-dccd926c7437)

    
Note - If both start and end times are not provided, the workflow will use the default window size.

 <img width="1076" alt="Screenshot 2025-08-29 at 3 26 38 PM" src="https://github.ibm.com/roja/concert-workflows/assets/470273/fb81bd72-a240-46be-8e32-e2e62d1e9c30">



## After configuring all the necessary input variables and authentication details, save the workflow.

   Click Run to execute the workflow.

   After the workflow is executed, the metrics will be displayed per instance as shown below.


 <img width="1252" alt="Screenshot 2025-09-11 at 8 45 14 PM" src="https://github.ibm.com/roja/concert-workflows/assets/470273/d89460ed-05aa-4843-9711-f431bd2bcf32">



 
Metrics collected

 <img width="1432" alt="Screenshot 2025-09-11 at 8 49 25 PM" src="https://github.ibm.com/roja/concert-workflows/assets/470273/84a651a1-5f01-45fc-b200-564b1c72425c">




Custom metrics calculation from your EC2 instance - examples

 Prerequisite: Ensure that the AWS access key, secret key, and session token are exported on the instance.


1. Firewall_active

        sudo vi /usr/local/bin/firewall_check.sh


        #!/bin/bash
        VALUE=0
        if systemctl list-units --type=service | grep -q firewalld; then
            if systemctl is-active --quiet firewalld; then
                VALUE=1
            fi
        fi
        if command -v ufw >/dev/null 2>&1; then
            if sudo ufw status | grep -q "Status: active"; then
                VALUE=1
            fi
        fi
   
        INSTANCE_ID=i-0d459dd6ea11076bb
     
        aws cloudwatch put-metric-data \
          --namespace “AWS/EC2" \
          --metric-name "firewall_active" \
          --dimensions InstanceId=$INSTANCE_ID \
          --value $VALUE \
          --unit Count


        sudo chmod +x /usr/local/bin/firewall_check.sh
        sudo /usr/local/bin/firewall_check.sh


2. num_disabled_unnecessary_services

       sudo vi /usr/local/bin/disabled_services_check.sh


        #!/bin/bash
        # Define unnecessary services for this host
        UNNECESSARY_SERVICES=("cups" "avahi-daemon" "bluetooth" "rpcbind" "nfs" "postfix")
        COUNT=0
        for svc in "${UNNECESSARY_SERVICES[@]}"; do
          if systemctl list-unit-files | grep -q "$svc"; then
            if ! systemctl is-enabled --quiet $svc && ! systemctl is-active --quiet $svc; then
              COUNT=$((COUNT+1))
            fi
          fi
        done
        echo "num_disabled_unnecessary_services=$COUNT"
        INSTANCE_ID=i-0d459dd6ea11076bb
        aws cloudwatch put-metric-data \
          --namespace "AWS/EC2" \
          --metric-name "num_disabled_unnecessary_services" \
          --dimensions InstanceId=$INSTANCE_ID \
          --value $COUNT \
          --unit Count


       sudo chmod +x /usr/local/bin/disabled_services_check.sh
       sudo /usr/local/bin/disabled_services_check.sh

3.num_non_https_ports

     sudo vi /usr/local/bin/non_https_ports_check.sh

      #!/bin/bash
      # Count listening TCP/UDP ports excluding 443
      NUM_NON_HTTPS=$(ss -tuln | awk '{print $5}' | grep -oE '[0-9]+$' | grep -v '^443$' | sort -u | wc -l)
      echo "num_non_https_ports=$NUM_NON_HTTPS"
      INSTANCE_ID=i-0d459dd6ea11076bb
      aws cloudwatch put-metric-data \
        --namespace "AWS/EC2" \
        --metric-name "num_non_https_ports" \
        --dimensions InstanceId=$INSTANCE_ID \
        --value $NUM_NON_HTTPS \
        --unit Count


4.num_pending_updates

      sudo vi /usr/local/bin/check_updates.sh

      #!/bin/bash
      updates=$(yum check-update | grep -v 'Loaded plugins' | wc -l)
      instance_id=i-0d459dd6ea11076bb
      
      aws cloudwatch put-metric-data \
        --namespace EC2/CloudWatchAgent \
        --metric-name num_pending_update_across_hosts \
        --dimensions InstanceId=$instance_id \
        --value $updates \
        --unit Count \
        --region us-east-2


     sudo chmod +x /usr/local/bin/check_updates.sh

     /usr/local/bin/check_updates.sh

     it will push the metric to cloud watch namespace


5.Filesystemerror


       sudo vi /usr/local/bin/filesystem_check.sh

       #!/bin/bash
       ERRORS=$(dmesg | grep -i "error" | wc -l)
       
       if [ $ERRORS -gt 0 ]; then
           VALUE=1
       else
           VALUE=0
       fi
       
       # Get Instance ID from EC2 metadata
       INSTANCE_ID=i-0d459dd6ea11076bb
       
       # Push metric to CloudWatch
       aws cloudwatch put-metric-data \
         --namespace "AWS/EC2" \
         --metric-name "filesystem_error" \
         --dimensions InstanceId=$INSTANCE_ID \
         --value $VALUE \
         --unit Count



       sudo chmod +x /usr/local/bin/filesystem_check.sh

       sudo /usr/local/bin/filesystem_check.sh



 # AWS_Ec2_Metrics_Assessment_WF workflow


 This workflow produces consolidated posture assessments for all instances linked to the application, based on the provided metrics data.

## How It Works

Collects metrics data for all application instances.

Processes the data to compute key assessment metrics.

Generates a consolidated posture report across all instances.

## Usage

Provide the metrics data as input in JSON format.

Run the workflow to automatically compute assessment metrics.


## Prerequisites for Workflow Execution

1.A profile must be created using relevant Non-Functional Requirements (NFRs).
    NFRs Required for Profile Creation.(VM Integrity assurance Library, Runtime production readiness Library)

   <img width="809" alt="Screenshot 2025-09-11 at 8 52 05 PM" src="https://github.ibm.com/roja/concert-workflows/assets/470273/7c1a636d-f799-4d30-8399-1717c245bef7">


   
2.The application must exist in IBM Concert, as assessments are created only for available apps.

3.Inputs to the Workflow

     1.Metrics_data - Provide the metrics_data for each instance in the following format. These values will be used by the workflow to calculate the NFRs      (Non-Functional Requirements)
      sample input
      {
    "i-0d459dd6ea11076bb": {
        "swap_used": 448369994.38877755,
        "cpuutilization": 4.532,
        "mem_used_percent": 67.5,
        "swap_free": 625368203.264,
        "disk_free": 20480,
        "disk_used": 8510201856,
        "tmp_disk_used": 0,
        "tmp_disk_free": 474398720,
        "netstat_tcp_established": 6,
        "num_pending_update_across_hosts": null,
        "filesystem_error": null,
        "firewall_active": null,
        "num_disabled_unnecessary_services": 1,
        "num_non_https_ports": 1
    },
    "i-0b6d25b6a7b81704b": {
        "swap_used": null,
        "cpuutilization": null,
        "mem_used_percent": null,
        "swap_free": null,
        "disk_free": 12488042705.314629,
        "disk_used": 27979122478.68537,
        "tmp_disk_used": null,
        "tmp_disk_free": null,
        "netstat_tcp_established": 97,
        "num_pending_update_across_hosts": 2,
        "filesystem_error": 1,
        "firewall_active": 1,
        "num_disabled_unnecessary_services": null,
        "num_non_https_ports": null
    }
}
      2. Ibm_concert_api - authentication for ibm_concert_Api_key
      3.In_profile_name - profile name associated with the application
      4.In_app_name - application name
      5.In_app_version - application version

ibm_concert_api

<img width="859" alt="Screenshot 2025-09-03 at 4 11 50 PM" src="https://github.ibm.com/roja/concert-workflows/assets/470273/61a3e3b1-f4e3-4f7d-8501-038cec9f1594">


## After configuring all the necessary input variables and authentication details, save the workflow.
Click Run to execute the workflow.




   









     
      






















---
