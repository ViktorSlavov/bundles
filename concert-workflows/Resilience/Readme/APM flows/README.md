
# Prerequisites for All Workflow Execution

## Create Authentication Configurations

You can use one of the following authentication methods:

#### IBM Hub - Self (Recommended)
Go to the **Workflows > Authentications** tab, select **IBM Hub - Self** as the service, provide a name for your authentication, and click **Create**.


#### IBM Concert API Key
Go to the **Workflows > Authentications** tab, select **IBM Concert API Key** as the service, provide the following details, and click **Create**:

- `Protocol`: Select the appropriate protocol (e.g., `https`)
- `Host`: Your Concert domain with port (e.g., `example.com:8000`)
- `Instance ID`: Your Concert instance ID
- `API Key Type`: Select `C_API_Key`
- `API Key`: Your Concert API key secret
---

# Dynatrace Workflow Integration with Concert Workflows

## Overview
This document provides instructions for integrating Dynatrace workflows within the **Resilience** folder of Concert Workflows. Follow these steps to configure your Dynatrace environment and ensure successful workflow execution.

## Prerequisites for Workflow Execution

Once you have completed the below prerequisites, you should be ready to import and execute your Dynatrace workflow within Concert Workflows. If you encounter any issues, ensure all settings are properly configured and the necessary credentials are correct.

### 1. Upload Application to Concert
- Upload the application that is being monitored by Dynatrace to the **Concert** platform.

### 2. Enable Resilience Settings
- Enable the **Resilience** settings in the following areas:
  - **Main Settings** of Concert
  - **Application Settings** within Concert

### 3. Create a Posture for the Application
- Navigate to the **Resilience** tab within Concert and create a **Posture** for your application. Use your specific profile to configure this posture.

### 4. Create Authentication Configurations
- You will need to create the appropriate authentication configurations to enable secure communication between Concert and     Dynatrace. This ensures that the workflow can access required resources and data during execution.

    **Dynatrace Authentication:**
    - Create a Dynatrace authentication configuration.
    - Provide the **Environment ID** (e.g., `yrg32424`) and **API token** from your Dynatrace account.

For all other authentication types, please refer to the  [Create Authentication Configurations](#create-authentication-configurations) section.

## Input to the workflow
<img width="1030" alt="Screenshot 2025-04-02 at 4 43 56 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/bf4282c4-7a9f-4c14-8202-2aba0564fc9c">
<img width="966" alt="Screenshot 2025-04-02 at 4 44 02 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/037f1dc2-5742-43c3-b162-d9f450b039ba">

### Description:
- applicationVersion – The SBOM version of your application that is loaded in Concert.
- origin_name – Set to Dynatrace, as this is the source from which the metrics are retrieved.
- origin – Set to APM, as the collected data pertains to APM (Application Performance Monitoring) metrics.
- origin_url – Your Dynatrace account URL.
- application_name – The name of your application, either as registered in Concert or as monitored via Dynatrace.
- profile_name – The profile name associated with the posture created in Step 3 of the Prerequisites.
- defaultWindowSize – The time window or duration for which metrics should be fetched.
- service_id - Id of the service which we wanted a metric for.
- Synthetic_test_id - Id of the synthetic test for which we need to metric 
- concertAPIKey – The path where the Concert API key needs to be provided.
- concertConfigAuth – The path for configuring authentication related to Concert.
- dynatrace_auth – The path where Dynatrace authentication details should be specified.

## Run workflow

### 1. You will see the below output after running 
You can see the generated assessment_id 
<img width="1702" alt="Screenshot 2025-04-02 at 4 58 01 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/7d6019bb-d67d-49d1-b7b7-7e829f8f357d">

### 2. Go to concert >> Dimensions  >> Resilience >> click on your posture >> click on the assesment
 You can see the metrices which is coming from dynatrace 
 <img width="1718" alt="Screenshot 2025-04-02 at 5 03 14 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/4a4d3453-4104-421c-b04b-5fb3e4419197">

---

# Datadog Workflow Integration with Concert Workflows

## Overview
This document provides instructions for integrating Datadog workflows within the **Resilience** folder of Concert Workflows. Follow these steps to configure your Datadog environment and ensure successful workflow execution.

## Prerequisites for Workflow Execution

Once you have completed the below prerequisites, you should be ready to import and execute your Datadog workflow within Concert Workflows. If you encounter any issues, ensure all settings are properly configured and the necessary credentials are correct.

### 1. Upload Application to Concert
- Upload the application that is being monitored by Datadog to the **Concert** platform.

### 2. Enable Resilience Settings
- Enable the **Resilience** settings in the following areas:
  - **Main Settings** of Concert
  - **Application Settings** within Concert

### 3. Create a Posture for the Application
- Navigate to the **Resilience** tab within Concert and create a **Posture** for your application. Use your specific profile to configure this posture.

### 4. Create Authentication Configurations
- You will need to create the appropriate authentication configurations to enable secure communication between Concert and DataDog. This ensures that the workflow can access required resources and data during execution. 

    **Datadog Authentication:**
    - Create a Datadog authentication configuration.
    - API Key from your Datadog account
    - Generate Application key (from profile) from your Datadog account

For all other authentication types, please refer to the  [Create Authentication Configurations](#create-authentication-configurations) section.

## Input to the workflow
<img width="1050" alt="Screenshot 2025-04-04 at 1 11 00 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/b90e0eca-fcd0-4594-a96c-c8f8e6a1ce6b">
<img width="1012" alt="Screenshot 2025-04-04 at 1 11 16 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/4b60ddb4-899a-40d3-b844-677848a4134f">
<img width="937" alt="Screenshot 2025-04-04 at 1 11 22 PM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/de864389-4015-4640-85fb-ed4940e5e1ad">

### Description:
- origin – Set to APM, as the collected data pertains to APM (Application Performance Monitoring) metrics.
- origin_name – Set to Datadog, as this is the source from which the metrics are retrieved.
- origin_url – Your Datadog account URL. The url will be `https://<region>.datadoghq.com` for example if your datadog account is based in us5 region the origin_url will be `https://us5.datadoghq.com`.
- applicationVersion – The SBOM version of your application that is loaded in Concert.
- application_name – The name of your application, either as registered in Concert or as monitored via Datadog.
- profile_name – The profile name associated with the posture created in Step 3 of the Prerequisites.
- defaultWindowSize – The time window or duration for which metrics should be fetched.
- service_name - The service which you want to get metrics for.
- env_name - Env name is which where the service is running like prod, test etc.
- syn_test_id - Id of synthetic test for which you want to have metric for. The test ID will be generated once the synthetic test is created. The ID is usually a string separated by '-' like `tcw-hji-piy`.
- concertAPIKey – The path where the Concert API key needs to be provided.
- concertConfigAuth – The path for configuring authentication related to Concert.
- datadog_auth – The path where Datadog authentication details should be specified.

## Run workflow

### 1. You will see the below output after running 
You can see the generated assessment_id 
<img width="1728" alt="Screenshot 2025-04-04 at 11 37 56 AM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/9bf5436a-d2d9-4f08-8b32-2b4d52f4e56d">


### 2. Go to concert >> Dimensions  >> Resilience >> click on your posture >> click on the assesment
 You can see the metrices which is coming from datadog 
 <img width="1728" alt="Screenshot 2025-04-04 at 11 35 32 AM" src="https://github.ibm.com/roja/concert-workflows/assets/350342/4bce5b36-82f4-4a1d-9feb-8b3545251b66">

---

# Instana Workflow Integration with Concert Workflows

## Overview
This workflow is designed to run Instana resilience tests within the IBM Concert platform. It involves authentication with Instana, API key authentication, and selecting configuration profiles.

## Prerequisites for Workflow Execution

Once you have completed the below prerequisites, you should be ready to import and execute your instana workflow within Concert Workflows. If you encounter any issues, ensure all settings are properly configured and the necessary credentials are correct.

### 1. Pull the application using ingestion job
                1.Navigate to administration --> integrations.
                2.Click on connections -→ Create connection
                3.Search for instana --> select IBM instana Observability.
                4.name the connection
                5.origin_url: Provide instana instance url like https://<instana_instance_domain>.instana.io
                6.give the apikey as <Api key>
                7.click validate connection
                8.click on create to create connection
            Create the ingestion job
                1.Navigate to administration --> integrations.
                2.Click on ingestion jobs -→ Create ingestion job
                3.name the ingestion job
                4.select the connection type as instana.
                5.select the connection.
                6.select the target ennvironment
                7.click on create to create injection job
                8.run the ingestion job

### 2. Enable Resilience Settings
- Enable the **Resilience** settings in the following areas:
  - **Main Settings** of Concert
  - **Application Settings** within Concert


### 3. Create Authentication Configurations
- You will need to create the appropriate authentication configurations to enable secure communication between Concert and Instana. This ensures that the workflow can access required resources and data during execution. 

   **Instana Authentication:**
   - Go to the Workflows tab in IBM Concert.
   - Navigate to Authentications.
   - Click Create Authentication.
   - Select Service as IBM instana.
   - Provide the following  details:
       ```bash
        Subdomain :<instana_instance_subdomain> # Only the subdomain, not the full URL
        API Key : <api_key> 
        ```
   - Save the authentication.

For all other authentication types, please refer to the  [Create Authentication Configurations](#create-authentication-configurations) section.

### 4. Provide inputs to run the workflow
To determine which inputs need to be passed to your workflow, refer to the images below. Additionally, explanation is provided for some of the inputs to help you understand what each one represents.

<img width="1042" alt="Screenshot 2025-04-08 at 3 53 00 PM" src="https://github.ibm.com/roja/concert-workflows/assets/481485/041191a4-29f3-4a87-96a7-4de196467414">

#### Description:
- application_name – The name of your application, either as registered in Concert or as monitored via Instance.
- profile_name – The profile name associated with the posture created in Step 3 of the Prerequisites.
- defaultWindowSize – The time window or duration for which metrics should be fetched.
- concertAPIKey – The path where the Concert API key needs to be provided.
- concertConfigAuth – The path for configuring authentication related to Concert.
- instanaAuth – The path where Instana authentication details should be specified.
- originUrl - Provide your instana instance domain
- webApplicationName - The web application name of your application

Note: Synthetic Test Setup is not mandatory for workflow execution.

## Run workflow

### 1. You will see the below output after running 
You can see the generated assessment_id 

<img width="1728" alt="Screenshot 2025-04-08 at 3 59 48 PM" src="https://github.ibm.com/roja/concert-workflows/assets/481485/c70bc6e4-ae32-4559-8d44-5813b58ec267">

### 2. Go to concert >> Dimensions  >> Resilience >> click on your posture >> click on the assesment
 You can see the metrices which is coming from instana 

<img width="1728" alt="Screenshot 2025-04-08 at 4 01 33 PM" src="https://github.ibm.com/roja/concert-workflows/assets/481485/bb018690-912c-45df-8de5-0bfa330d3b5e">

---

# Image Registry Workflow
## Overview
This document provides instructions for Image Registry Workflow within the **Resilience** folder of Concert Workflows.
The image registry workflow will capture the metrics for the images that are not deployed in any environment, but the images are only present in the registry. The workflow will pull those images into an VM, and then inspect the images to compute the metrics related to image layers and size.

## Prerequisites for Workflow Execution

Once you have completed the below prerequisites, you should be ready to import and execute your image registry workflow within Concert Workflows.

### 1. Upload Application to Concert
- The application for which the images are provided as input to the workflow should be present in Concert.

### 2. Inputs to the Workflow
`Concert API Key Auth` - The API key authentication of the Concert Instance.

`VM Auth` - SSH Auth of the VM in which the images will be pulled.

`Concert Config Auth` - Config Auth of the Concert Instance.

  ```json
     {
       "concert_host": "test.fyre.ibm.com",         // Concert VM host URL
       "concert_port": "12443",                     // Concert VM port
       "concert_instance_id": "0000-0000-0000-0000" // Concert VM instance ID
     }
  ```


`Registry Config Auth` - Config Auth of the Registry from which the images are to be pulled.

  ```json
     {
       "registry_username": "sample_username", // Registry Username
       "registry_password": "sample_password", // Registry Password
       "registry_url": "sample_registry_url" // Registry URL
     }
  ```

`Application Name` - Name of the application of which the images are pulled.

`Application Version` - Version of the application.

`Public Registry boolean` - This boolean should have value as `true` if the registry is `public` and it should have value as `false` if the registry is `private`

`Image List` - Array of Images to be pulled.

`docker_command` - Docker command for the VM provided in VM Auth, by default it is set to `docker`

### After configuring all the necessary input variables and authentication details, save the workflow.
#### Click Run to execute the workflow.
After the execution of the Workflow, The assesment will be created in the `Resilience` tab.

---

# Package_Vulnerability_Exposure_Assessment- Workflow
## Overview
This document provides instructions for Package_Vulnerability_Exposure_Assessment Workflow within the **Resilience** folder of Concert Workflows.

**Functionality**:

Pull aggregated metrics for Packages, vulnerabilities and Exposures for the given application and
Load the Assessment data to IBM Concert for all the profiles associated with that application.

Metrics computed -

**Packages** - Unpermitted packages,Backlevel packages,Outdated packages

**Open Exposures** - num_priority1_exposures ,num_priority2_exposures,num_priority3_exposures,num_deprioritized_exposures

**Open Vulnerabilities** - num_priority1_vulnerabilities ,num_priority2_vulnerabilities, num_priority3_vulnerabilities,num_deprioritized_vulnerabilities


## Prerequisites for Workflow Execution

Once you have completed the below prerequisites, you should be ready to import and execute your Package_Vulnerability_Exposure_Assessment workflow within Concert Workflows.

### 1. Upload Application and respective packages,images scan and exposures scan files to Concert
- The application for which the package, vulnerability, and exposure metrics need to be retrieved must be available in Concert..
- Upload the respective packages,images scan and exposures scan files to Concert.

### 2. Create a Posture for the Application
Navigate to the Resilience tab within Concert and create a Posture for your application. Use your specific profile to configure this posture.

### 3. Inputs to the Workflow
`Concert API Key Auth` - The API key authentication of the Concert Instance.

service name for API Key Auth-  API Key


`Concert Config Auth` - Config Auth of the Concert Instance.

  ```json
     {
       "concert_host": "test.fyre.ibm.com",         // Concert VM host URL
       "concert_port": "12443",                     // Concert VM port
       "concert_instance_id": "0000-0000-0000-0000" // Concert VM instance ID
     }
  ```


`Application Name` - Name of the application of which the mertics needs to be retrieved.

`Application Version` - Version of the application.


### After configuring all the necessary input variables and authentication details, save the workflow.
#### Click Run to execute the workflow.
After the execution of the Workflow, The assesment will be created in the `Resilience` tab.

---
