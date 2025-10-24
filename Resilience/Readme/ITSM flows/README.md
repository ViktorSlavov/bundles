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
# Service Now Resilience

## Project Description
This workflow retrieves problems/incidents from ServiceNow over a specified time period, calculates the percentage of incidents (sev1 and sev2) in ServiceNow that are either resolved by change or detected by monitoring tools, and sends the processed data to the Concert Resilience evaluation API.

## Prerequisites
Once you have completed the below prerequisites, you should be ready to import and execute your ServiceNow workflow within Concert Workflows. If you encounter any issues, ensure all settings are properly configured and the necessary credentials are correct.

### 1. Upload the SBOM for your application to Concert
This will allow you to calculate metrics against the provided application.

### 2. Resilience Prerequisites
Ensure the following steps are completed before using the workflow:

- **Upload the library** which has observability NFRs (like MTTD, MTTA). Alternatively, you can use the Foundational Library, which will be automatically loaded as part of the sample data.
  
- **Create a Resilience Profile for your application:**
    1. Go to `Inventory -> Applications`.
    2. Click on your application.
    3. Navigate to `Settings`.
    4. Enable Resilience.

- **Create a Posture for your application.**

### 3. Before Importing the ServiceNow Resilience Workflow
Follow these steps:

1. Go to the **Workflow tab**.
2. Navigate to **Manage**.
3. Create a folder named `Resilience`.
4. After importing the main flow, your workflow folder hierarchy should look like the image below.
   
![Screenshot 2025-04-04 at 10 37 04 PM](https://github.ibm.com/roja/concert-workflows/assets/481473/db63d2c5-cd58-4938-9967-ece614bc3eb6)


### 4. Create Authentication Configurations
- You will need to create the appropriate authentication configurations to enable secure communication between Concert and ServiceNow. This ensures that the workflow can access required resources and data during execution.

    **ServiceNow Authentication:**

    - Go to **Workflows > Authentications**` and create Bearer authentication
     Use below curl to generate and retrieve access token (for testing)

     ```bash
        curl --request POST \
       --url https://<your_service_now_instance_uri>/identity/token \
       --header 'Content-Type: application/x-www-form-urlencoded' \
       --data grant_type=<your_grant_type> \
       --data apikey=<your_api_key> ```
       
For all other authentication types, please refer to the  [Create Authentication Configurations](#create-authentication-configurations) section.



### 5. Provide inputs to run the workflow
To determine which inputs need to be passed to your workflow, refer to the images below. Additionally, explanation is provided for some of the inputs to help you understand what each one represents.

<img width="1065" alt="Screenshot 2025-04-02 at 11 03 48 PM" src="https://github.ibm.com/roja/concert-workflows/assets/481473/b824ae9a-636c-43f5-935c-09057ea1ed8a">
<img width="1065" alt="Screenshot 2025-04-02 at 11 03 56 PM" src="https://github.ibm.com/roja/concert-workflows/assets/481473/92ac149e-12a5-4443-a4a9-b1b1010fbd57">

- startTimestamp - The startTime from which the search must be made. It is in Epochmillis
- applicationVersion – The SBOM version of your application that is loaded in Concert.
- origin_name – Set to ServiceNow, as this is the source from which the metrics are retrieved.
- origin – Set to ITSM, as the collected data pertains to ITSM metrics.
- origin_url – Your Service now account URL. The url will look similar to `https://<your-instance>.service-now.com`
- application_name – The name of your application, either as registered in Concert or as monitored via ServiceNow.
- profile_name – The profile name associated with the posture created in Step 2 of the Prerequisites.
- defaultWindowSize – The time window or duration for which metrics should be fetched.
- concertAPIKey – The path where the Concert API key needs to be provided.
- concertConfigAuth – The path for configuring authentication related to Concert.
- serviceNowHost - Your ServiceNow account HOST URL where the "Problems" exist. The url will look similar to `https://<your-instance>.service-now.com` unless there is a proxy or  custom API Route, in which case you can use the said proxy/Custom API route url.
- serviceNowAuthKey – The path where Service now authentication details should be specified.

### 6. Run your Workflow
Ensure all authentication configurations and required inputs are provided before running the workflow.


### 7. Verification
After running the workflow, verify whether the assessment has been successfully created. Refer to the image below for confirmation.

**When there is no data for the given time range, the following error will be displayed:**
![Empty JSON Data](https://github.ibm.com/roja/concert-workflows/assets/463392/73ab2864-f409-4b86-b25c-7f4d10c7dbd5)

**When there is an Unauthorized access, then the following response will be displayed:**
![Unauthorized Access](https://github.ibm.com/roja/concert-workflows/assets/463392/8c812538-0493-4036-a2bf-a9a4949e3891)

**If the assessment has been successfully created, you will receive the following response:**
<img width="1728" alt="Screenshot 2025-04-02 at 11 31 21 PM" src="https://github.ibm.com/roja/concert-workflows/assets/481473/535f3c3d-ee5b-4941-9681-373e16f5a23a">

---
# Jira Workflow Integration with Concert Workflows

## Overview
This document provides instructions for integrating Jira workflows within the **Resilience** folder of Concert Workflows. Follow these steps to configure your Jira environment and ensure successful workflow execution.

### What workflow to Choose ?
- Jira Public Cloud Resilience Sample Main Instance => When you have a Public Jira Instance which support servicedesk projects. To confirm this, your jira url will look similar to `https://<your-instance-name>.atlassian.net/jira/servicedesk/projects/<project-name>`
- Jira Enterprise RCA Resilience Sample Main Instance => When you have an Enterprise Edition of Jira which supports projects. To confirm this, your jira url will look similar to `https://<your-company-jira-url>/projects/<project-name>/queues`
-Jira Enterprise P2P Resilience Sample Main Instance => When you have an Enterprise Edition of Jira which supports "servicedesk" projects. To confirm this, your jira url will look similar to `https://<your-company-jira-url>/servicedesk/customer/portal/<project-name or project-number>`

## Prerequisites for Workflow Execution

Once you have completed the below prerequisites, you should be ready to import and execute your Jira workflow within Concert Workflows. If you encounter any issues, ensure all settings are properly configured and the necessary credentials are correct.

### 1. Upload Application to Concert
- Upload the application that is being monitored by Jira to the **Concert** platform.

### 2. Create Jira Authentication Configurations
- You will need to create the appropriate authentication configurations to enable secure communication between Concert and Jira. This ensures that the workflow can access required resources and data during execution.

The following auth(s) are needed when using the said Instances
   #### Jira Public Cloud Resilience Sample Main Instance
   1. Make Sure you have an account in the Jira and note your email registered with the said jira instance
   2. Go to **Workflows > Authentications**` => Create an authentication of type Basic Auth and for the following fields enter the said values
         - **Host** => Your atlassian instance of the format "<Your-atlassian-instance-name>.atlassian.net" 
         - **Username** => Your email ID registered with the Jira INstance
         - **Password** => Your API Token(if possible all scopes) under the same Jira instance
 ![image](https://github.ibm.com/roja/concert-workflows/assets/463392/b0d6d76f-d1a6-42a7-b421-015a6a7be408)
     

   
   #### Jira Enterprise RCA/P2P Resilience Sample Main Instance
   1. Go to **Workflows > Authentications**` and create Bearer authentication  
   2. Provide the **API Bearer Token** from your Jira account  

For all other authentication types, please refer to the  [Create Authentication Configurations](#create-authentication-configurations) section.


### 3. Provide inputs to run the workflow
To determine which inputs need to be passed to your workflow, refer to the images below. Additionally, explanation is provided for some of the inputs to help you understand what each one represents.

In the Case where you are running a Jira Public Cloud Resilience Sample Main Instance

<img width="1026" alt="Screenshot 2025-09-24 at 1 24 11 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/b8770380-0a7a-48b9-8f62-8eb8f94247bb">
<img width="1027" alt="Screenshot 2025-09-24 at 1 24 29 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/65e8dac2-a364-49fe-bb00-2de4107f156b">

In the Case where you are running a Jira Enterprise RCA/P2P Resilience Sample Main Instance

<img width="1030" alt="Screenshot 2025-09-24 at 1 25 03 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/4274bd6c-7855-4c92-8b06-e2b00171766e">
<img width="1028" alt="Screenshot 2025-09-24 at 1 25 17 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/f0a698aa-af51-4dbb-be4a-44627c0df776">


- startTimestamp - The startTime from which the search must be made. It is in Epochmillis
- endTimestamp - The endTime from which the search for records will stop
   - by default if the startTimestamp and endTimestamp are 0 it takes said values endTimestamp=the current time and the startTimestamp=endTimestamp - 5 min 
- applicationVersion – The SBOM version of your application that is loaded in Concert.
- origin_name – Set to Jira, as this is the source from which the metrics are retrieved.
- origin – Set to ITSM, as the collected data pertains to ITSM metrics.
- origin_url – Your Jira Instance URL.
      - The Jira Public Instance url will look similar to `<your-instance>.atlassian.net/jira/servicedesk/projects/<your-project-key>`
      - The Jira ServiceDesk Private Instance url will look similar to `<your-instance>/projects/<your-project-key>`
- application_name – The name of your application, either as registered in Concert or as monitored via Jira.
- profile_name – The profile name associated with the posture of the said application you trying to fetch the metrics for
- defaultWindowSize – The time window or duration for which metrics should be fetched.
- concertAPIKey – The path where the Concert API key needs to be provided.
- concertConfigAuth – The path for configuring authentication related to Concert.
- jiraHost - Your Jira account HOST URL where the "Incidents" exist. The url will look similar to `<your-instance>.atlassian.net` or `<your-instance-name>.<your-company-name>.com` unless there is a proxy or  custom API Route, in which case you can use the said proxy/Custom API route url.
- jiraAuthKey – The path where Jira details should be specified. For further details about creating this check out the 2nd step of this section titled "2. Create Jira Authentication Configurations". You will enter the values for the respective authentications from the Workflows -> Authentication and then copy-paste the "authKey" value here (e.g, `ibmconcert/jiraAuth`)

## 4. Preparing Your Jira Mapping & Schema

Before you execute the workflow, make sure your Jira fields and the workflow schema line up.
Follow this order to avoid runtime errors:

---

### 1️⃣ Check Your Field Format Against the Schema

The workflow ships with a strict JSON schema in the variable called `incidentSchema`.  
Every field you populate in `$incident` must match the types as mentioned in the schema, for example if the schema mentions:

- **Timestamps** → `string` (ISO-8601, e.g. `2025-01-15T10:59:00.000-0500`)  
- **Durations** → `string` (minutes/hours)  
- **Arrays** → typed (`Detection_Tools_Monitoring` is an array of strings)

If you add or rename fields:

1. Extend the **mapping block** with the new labels.  
2. Add matching entries to `incidentSchema.properties` (type, description, example).  
3. Re-run the workflow to confirm the JSON Schema validation passes.

> ⚠️ **Validation:**  
> The schema is enforced at runtime — if the input value type and schema type doesn’t match, you’ll get:
>
> ```json
> {
>   "assessment_result": {
>     "status": "Error",
>     "Message": "…details from the validator…"
>   }
> }
> ```

---

### 2️⃣ Understand Where to Bind Your Jira Fields

Look at the **schema keys** (on the left) and the **corresponding field labels** in your Jira instance (on the right).  
Fill those labels in the `MAPPING FUNCTION` inside `Function_7`:

```javascript
// Schema Key                // Jira Field Label (exact as seen in your project)
$incident.Outage_Start_Time   = "Outage Start Time";   // e.g., your field is “Outage Start Time”
$incident.Outage_End_Time     = "Outage End Time";
$incident.Priority            = "Priority";
```

➡️ If someone else’s Jira uses a different label (e.g., OST instead of Outage Start Time),
update the right-hand side only:
$incident.Outage_Start_Time = "OST";

    Note:

        The schema key (left side) never changes — it’s part of the workflow.

        Only the value (right side) must match the exact label in your Jira project.

### 5. Run your Workflow
Ensure all authentication configurations and required inputs are provided before clicking on the run button on top right to start running the workflow.

<img width="1680" alt="Screenshot 2025-09-24 at 4 34 54 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/fd25104b-5385-42e4-a4a0-dea0860c96b0">


### 6. Verification
After running the workflow, verify whether the assessment has been successfully created. Refer to the image below for confirmation.

#### Both Instances of Jira will give the same output

**Jira Public Cloud Resilience Sample Main Instance**
<img width="1701" alt="Screenshot 2025-09-24 at 4 35 25 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/7f97c47f-0bbb-4dc8-882d-c806cf13fa45">

**Jira Enterprise RCA/P2P Resilience Sample Main Instance**
<img width="1728" alt="Screenshot 2025-09-24 at 4 43 05 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/551b5cf8-92d8-414f-acb5-bd576191fdae">


### 7. Go to concert >> Dimensions  >> Resilience >> click on your posture >> click on the assesment
 You can see the metrices which is coming from Jira Instance 

<img width="1727" alt="Screenshot 2025-06-02 at 7 38 16 PM" src="https://github.ibm.com/roja/concert-workflows/assets/463392/c10e43d2-9c2c-44f4-bee1-8c5c06a2b8ed">

---
