# Prerequisites for All Workflow Execution

## Create Authentication Configurations
To authenticate with Concert, follow these steps:

1. **Concert API Key Authentication:**
   - Go to **Workflows > Authentications** and create an API key for Concert.
   - Provide the API key of your Concert instance.

2. **Concert Configuration Authentication:**
   - Create a Config Data for Concert.
   - Provide the following details:
     ```json
     {
       "concert_host": "test.fyre.ibm.com",         // Concert VM host URL
       "concert_port": "12443",                     // Concert VM port
       "concert_instance_id": "0000-0000-0000-0000" // Concert VM instance ID
     }
     ```
---
# Java App Discovery ( Springboot Application)
* This workflow is for Automatic Discovery of Spring Boot applications on a target VM,
* SBOM Generation for discovered applications,
* Upload generated SBOMS to Concert,
* Collect pertinent operation metrics of the discovered application,
* Resilience Evaluation to align the metrics with critical NFRs pertaining to the application

## Prerequisites
* SSH credentials to the target VM where applications are running. Assuming the user has root access to the vm. 
* Upload java library which has observability NFRs in Concert Resilience 
* Create a Resilience Profile for your application with this library
* assuming the application has enabled actuator for metrics collection

## Required authentications and inputs
* create authentication for the vm,  ibm concert config auth , and concert api key
* Also give vm hostname, the acttuator url, resilience profile name
![Screenshot 2025-07-14 at 10 29 52 PM (1)](https://github.ibm.com/roja/concert-workflows/assets/481473/1bbb3428-757c-41d5-abb0-08d7f18cb40d)

![Screenshot 2025-07-14 at 10 29 33 PM (1)](https://github.ibm.com/roja/concert-workflows/assets/481473/cdc0b621-ac5e-418a-8786-b797d2e3ebac)


## Run the workflow .
Once you make sure the authentications and the inputs are given correctly, run the main workflow. Go to Concert Resilience to view the resilence score of the discovered applications. 

---
# Auto Discovery for containerised applications

* This workflow is for Automatic Discovery of containerised application on a target VM,

* SBOM Generation for discovered applications

* Upload generated SBOMS to Concert

* Checks the status of uploaded SBOM

* Create resilience profile per application 

* Checks if resilience profile exists or not

* Collect pertinent operation metrics by docker inspect command for the discovered application

* Resilience Evaluation to align the metrics with critical NFRs pertaining to the application for the profile docker_containers_profile

* Uploads the findings to evidence locker (EL)

*  Asynchronous Call to the exposed workflow where we create the scan files for each docker image


## Prerequisites

* SSH credentials to the target VM where applications are running. Assuming the user has root access to the vm.

* Assuming the application is running in target VM with the container images running

* Target VM (ssh) should have docker installed, if not install it via cmd `yum install podman-docker -y` 


## Required authentications and inputs

* ssh_auth : SSH credentials to the target VM where applications are running. Assuming the user has root access to the vm.

* hub_auth_pliant : Create an authentication using type IBM Hub - Self.

* env_name: Environment where app needs to be run

<img width="1728" alt="Screenshot 2025-07-15 at 2 59 12 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/33a96ec9-bc1f-4a26-94d4-4c405f36648d">


## Run the workflow .

Once you make sure the authentications and the inputs are given correctly, run the main workflow. Go to Concert Resilience to view the resilence score of the discovered applications. See applications, profile and see cves for respective applications 

<img width="1728" alt="Screenshot 2025-07-15 at 3 01 35 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/3c9b3cd7-f590-41ef-8f0f-64a41dc0310a">

<img width="1675" alt="Screenshot 2025-07-15 at 3 02 35 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/c61c526a-3757-4323-b155-cbb290c6b31b">

<img width="1728" alt="Screenshot 2025-07-15 at 3 04 06 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/f70c1ea3-69c6-4c11-8344-d81b214ce80a">

<img width="1727" alt="Screenshot 2025-07-15 at 3 03 52 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/8d9046fa-ed33-4aae-8376-b1726e0d99be">

<img width="1728" alt="Screenshot 2025-07-15 at 3 03 36 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/640f1402-0a61-4da5-9169-c2b1d636a971">

---
# Syft and Trvivy Scan for Application Images

* Objective is to scan each container image defined for the application using Syft and Trivy.

* Prepares metadata payload for each scan, including application name, version, and profile.

* Runs the Syft and Trivy scan inside a Docker container on the target VM (with proper folder setup).

* Collects and transfers the scan output files from the VM using SFTP.

* Uploads the generated Package SBOM and Image Scan vulnerability reports to Concert.

## Prerequisites

* SSH credentials to the target VM where applications are running. Assuming the user has root access to the vm.

* Assuming the application is running in target VM with the container images running and that the applications have the repositories linked to them in Concert

* Target VM (ssh) should have docker installed, if not install it via cmd `yum install podman-docker -y`

* If Running on an EKS or OCP or any machine which needs elevated access of commands to run, go to the variable type object "fileSystem" and alter the value of "docker_commands" from "docker" into "sudo docker"
<img width="1012" alt="Screenshot 2025-07-28 at 9 12 26 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/9301cf0f-329b-429a-a02b-6483ac3395f9">

* If Docker socket permission is needed for your environment, navigate to the variable type object "fileSystem", and set the value of "docker_socket_permission_needed" to "yes".
![image](https://github.ibm.com/roja/concert-workflows/assets/463392/41f3799f-1040-469a-998f-aab6673c8c14)

* Ensure the output folder exists for storing scan result files. You can specify the desired folder location in the variable type object "fileSystem" by updating the value of "folderLocation". Make sure that the configured directory has appropriate read and write permissions for the user running the Docker container.
![image](https://github.ibm.com/roja/concert-workflows/assets/463392/41f3799f-1040-469a-998f-aab6673c8c14)

* Please pulled the the latest version of the ibm-concert-auto-mod and tag the image as follows:

            docker pull cp.stg.icr.io/cp/concert/ibm-concert-auto-mod:v2.0.0-503-20250706.234002-main

            docker tag cp.stg.icr.io/cp/concert/ibm-concert-auto-mod:v2.0.0-503-20250706.234002-main \
            cp.stg.icr.io/cp/concert/ibm-concert-auto-mod:v1

## Required authentications and inputs

* ssh_auth : SSH credentials to the target VM where applications are running. Assuming the user has root access to the vm.

* solis_hub_auth:    	curl -ks -X POST 'https://{HOSTNAME}:12443/solis_hub/core/api/v1/login' -H 'InstanceId: 0000-0000-0000-0000' -H 'Content-Type: application/json' -d '{"password": "password", "username":   	"ibmconcert"}' create a auth with bearer token and run this curl to get the token

* Inputs Needed 


 		a. ApplicationsImagesList : An array of Objects containing of the Application Name and their respective
					      Images, Profiles and Versions
  			For example:
  					[{
					    "app_name": "concert",
					    "profile_name": "concert profile",
					    "version": "1.0.0",
		                            "image_list": [
					        "cp.stg.icr.io/cp/concert/ibm-roja-minio:v1.2.0-448-20250628.114001-main",
					        "cp.stg.icr.io/cp/concert/ibm-roja-postgres:v1.2.0-448-20250628.114001-main"
					    ]
					}, {
					    "app_name": "solis-hub",
					    "profile_name": "solis-hub profile",
					    "version": "1.0.0",
                                            "image_list": [
					        "cp.stg.icr.io/cp/solis-hub/ibm-solis-embedded-db:v1.2.0-448-20250628.114001-main",
					        "cp.stg.icr.io/cp/solis-hub/keycloak-embedded:v1.2.0-448-20250628.114001-main"
					    ]
					}, {
					    "app_name": "quote-of-the-day",
					    "profile_name": "quote-of-the-day profile",
					    "version": "1.0.0",
                                            "image_list": [
					        "registry.gitlab.com/quote-of-the-day/qotd-usecase-generator:v5.1.0",
					        "registry.gitlab.com/quote-of-the-day/qotd-db:v5.1.0"
					    ]
					}]
		b. ssh_auth               : The auth with which you connect to the VM
		c. Solis_hub_auth         : The Solis bearer Token of your concert Instance
		d. Concert_config_auth    : The Concert Config Auth of your concert Instance
 <img width="1047" alt="Screenshot 2025-07-18 at 9 43 29 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/56dcca13-e804-4dab-9ba0-337aeb73a801">
 <img width="1059" alt="Screenshot 2025-07-18 at 9 44 01 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/64b4a7d8-72d0-485b-aa1c-8cadd2f7a0ec">

## Run the workflow 


Once you make sure the application images in the VM are running and authentications and the inputs are given correctly, run the main workflow. Go to Applications to view the result of the vulnerabilities mapped to your Applications. You can also check out the status of the image scan files uploaded in the event log.

<img width="1648" alt="Screenshot 2025-07-15 at 3 26 54 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/edb26b28-6070-4833-b5e4-131592dcd866">

<img width="1691" alt="Screenshot 2025-07-15 at 3 35 03 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/f0572216-22da-4288-bdd5-11e6fb2d00b5">

<img width="1727" alt="Screenshot 2025-07-15 at 3 34 26 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/742e4cd9-f8d1-44d7-845b-618cd1374b36">

<img width="1674" alt="Screenshot 2025-07-15 at 3 40 59 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/223bebdf-7225-42d1-b702-319a226698d6">

