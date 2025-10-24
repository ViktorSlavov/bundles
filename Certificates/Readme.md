# Windows RDP - Certificate Auto-Remediation

## Prerequisites
To allow Ansible to communicate with a Windows Remote Desktop (RDP) machine, **Windows Remote Management (WinRM)** must be enabled.

## Setup Workflow

### 1) Import the Workflow
- Import the workflow inside the **Certificates** folder in Concert Workflows.

### 2) Create Authentication for Windows RDP in Workflows
- Choose **service** as Ansible and provide credentials inside the inventory file:

  ```ini
  [windows]
  ip_address
  [windows:vars]
  ansible_user=
  ansible_password=
  ansible_connection=winrm
  ansible_port=5985
  ansible_winrm_transport=ntlm
  ```
Replace ip_address with the Windows machine's IP address, and provide the Windows authentication credentials for ansible_user and ansible_password.
- Create an **SSH authentication** with the same credentials, which will be used for workflow renewal.Choose Service as **SSH**
  
### 3) Go to your imported workflow in Workflows section.
- Click **Run** defined under the actions tab.
- Provide the following input fields:
  - `Concert_auth` (Provide the name of concertAPI key authentication which will be created at the time of installation)
  - `Environment name`
  - `Service_auth` (Windows authentication name which is created in step 2)


  <img width="1713" alt="Screenshot 2025-07-16 at 3 45 56 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/3250161e-83e9-4684-ae7b-a3023b5a997e">

### 4) Run the Workflow.
- Navigate to the **Operations** tab to view the fetched certificates.

---
## Renewal Flow

### 5) Expose the renewal workflow by clicking on the 'expose externally' tab under **Actions** next to the workflow.
- Define the reference name by which it should be shown.
- Define whether it should be run asynchronously or synchronously.

  <img width="1717" alt="Screenshot 2025-07-17 at 4 57 07 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/94683475-3803-41dd-b042-54df1b8d5b59">

### 6) Set the automation rule for Renewal
- Choose the workflow reference: 
  **/Windows_RDP_renewal**
  
  <img width="1728" alt="Screenshot 2025-07-17 at 4 37 35 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/230c8b3d-852a-428a-ac00-d300c6160800">

### 7) Run the Discovery workflow to trigger Renewal
- This will trigger the renewal endpoint if any certificate is eligible for renewal.
- The old certificate will be revoked in the Windows machine, and a new one will be created.

### 8) Fetch the Latest Certificates
- Run the discovery workflow again to retrieve the newly issued certificates.

---

This document provides a step-by-step guide to setting up Windows RDP certificate auto-remediation using Ansible in Concert Workflows.


# IBMCloud Secret Manager - Certificate Auto-Remediation

  This workflow lists all the certificates stored in IBM Cloud Secrets Manager and performs rotation only for the public certificates 
  if certificate is eligible for renewal.

## Setup Workflow

### 1) Import the Workflow
- Import the workflow in Concert Workflows.

### 2) Create Authentication for IBM Cloud Secrets Manager in Workflows
- Choose **service** as IBM Cloud Secrets Manager and provide credentials of each parameter:
  ```
     Api key -
     Instance id - 
     Location -
  
   a. To create the api key - IBM Cloud> IAM> API Keys.
   b. To get the Instance id and Location-
  
       Go to IBM Cloud Resource List.
       Filter or search for your Secrets Manager.
       Click on the icon in your Secrets manager name  and copy the CRN.
       If your IBM Cloud Secrets Manager CRN (Cloud Resource Name) is crn:v1:bluemix:public:secrets-manager:au-syd:a/37d50bee235b1155a3bb2e4402027907:0ec39f06-9655-46de-be01- 
        339c566g6112::,
       then Location: au-syd
       Account ID: 37d50bee485b4a65a3bb2e4402027907
       Instance ID: 0ec39f06-9655-46de-be01-339c566g6112 ← This is what you need for API calls

### 3) Go to your imported workflow in Workflows section.
- Click **Run** defined under the actions tab.
- Provide the following input fields:
  - `Concert_auth` (Provide the name of concertAPI key authentication which will be created at the time of installation)
  - `Service_auth` (IBM Cloud Secrets Manager authentication name which is created in step 2)
    
  <img width="1722" alt="Screenshot 2025-07-17 at 4 31 24 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/5a00ee02-2523-4420-ace8-b6744691f9d6">

### 4) Run the Workflow.
- Navigate to the **Operations** tab to view the fetched certificates.
  
---
## Renewal Flow

### 5) Expose the renewal workflow by clicking on the 'expose externally' tab under **Actions** next to the workflow.
- Define the reference name by which it should be shown.
- Define whether it should be run asynchronously or synchronously.
  
  <img width="1715" alt="Screenshot 2025-07-17 at 4 34 15 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/30862802-f704-43b0-a081-0975abd9e7be">

### 6) Set the automation rule for Renewal
- Choose the workflow reference: 
  **/IBM_SM_certs_renewal**

  <img width="1728" alt="Screenshot 2025-07-17 at 4 36 33 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/bea0f8f0-9927-411f-90d9-a02b1d519b70">
  
### 7) Run the Discovery workflow to trigger Renewal

- This will trigger the renewal endpoint if any certificate is eligible for renewal.
- The old certificate will be revoked in the Windows machine, and a new one will be created.

### 8) Fetch the Latest Certificates
- Run the discovery workflow again to retrieve the newly issued certificates.

---

This document provides a step-by-step guide to setting up IBM Cloud Secrets manager certificate auto-remediation Concert Workflows.


# Linux machine - Tomcat Java Keystore Certificate Auto-Remediation
This workflow lists all certificates stored in the Tomcat Java Keystore and performs rotation only for self-signed certificates that are eligible for renewal.

## Setup Workflow

### 1) Import the Workflow
- Import the workflow inside the **Certificates** folder in Concert Workflows.

### 2) Create Authentication for Linux machine in Workflows
- Choose **service** as Ansible and provide credentials inside the inventory file:

  ```
  [canary]
   <ip_address> ansible_host=ubu1.fyre.ibm.com ansible_user=root
  ```
Replace ip_address with the Linux machine's IP address, and provide the Linux authentication credentials for ansible_user

- Inside private key, provide the private key of the Linux machine and enter a space after it.

  ```
  -----BEGIN OPENSSH PRIVATE KEY-----
  private_key_of_machine
  -----END OPENSSH PRIVATE KEY-----
  
  ```

### 3) Create configData for keystores in Linux machine in Workflows Authentication
 - Choose  **service** as Config Data and provide an object of keystore path and password inside the data field:

  ```
  {
    "/path/to/keytore.jks" : "password"
  }
  ```

### 4) Go to your imported workflow in Workflows section.
- Click **Run** defined under the actions tab.
- Provide the following input fields:
  - `concertAuth`  (Provide the name of concertAPI key authentication which will be created at the time of installation)
  - `linuxAuth`    (Linux authentication name for ansible which is created in step 2)
  - `env_name`     (Name of environment where certificates are hosted)
  - `keystorePath` (Provide the location of .jks file)
  - `keystorePass` (Provide the password of keystore)

  <img width="1728" alt="Screenshot 2025-07-17 at 4 42 29 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/ff753e5e-57e7-4132-98c7-8bcac3c1434f">
  
### 5) Run the Workflow.
- Navigate to the **Operations** tab to view the fetched certificates.

---
## Renewal Flow

### 6) Expose the renewal workflow by clicking on the 'expose externally' tab under **Actions** next to the workflow.
- Define the reference name by which it should be shown.
- Define whether it should be run asynchronously or synchronously.
  
  <img width="1728" alt="Screenshot 2025-07-17 at 4 43 00 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/f25eca13-4d2a-4c9f-ad5c-872cd05ec532">

### 7) Set the automation rule for Renewal
- Choose the workflow reference: 
  **/Linux_Keystore_Cert_Renewal**
Provide the following input fields:
  - `passwordMap`  (Config data created in step 3)
  - `ansibleAuth`  (Linux authentication name for ansible which is created in step 2)
  - `validity`     (Validity of new certificate to be renewed)
  - `tomcatPath`   (Provide the location of tomcat)

  <img width="1728" alt="Screenshot 2025-07-17 at 4 43 37 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/b446a516-2d75-4cb2-a7a3-51fdb89fc32a">

### 8) Run the Discovery workflow to trigger Renewal

- This will trigger the renewal endpoint if any certificate is eligible for renewal.
- The old certificate will be revoked in the Windows machine, and a new one will be created.

### 9) Fetch the Latest Certificates
- Run the discovery workflow again to retrieve the newly issued certificates.

---

This document provides a step-by-step guide to setting up Linux machine certificate auto-remediation using Ansible in Concert Workflows.



# Windows RDP - Java Keystore Certificate Auto-Remediation
This workflow lists all certificates stored in the Tomcat Java Keystore and performs rotation only for self-signed certificates that are eligible for renewal.
## Prerequisites
To allow Ansible to communicate with a Windows Remote Desktop (RDP) machine, **Windows Remote Management (WinRM)** must be enabled.

## Setup Workflow

### 1) Import the Workflow
- Import the workflow inside the **Certificates** folder in Concert Workflows.

### 2) Create Authentication for Windows RDP in Workflows
- Choose **service** as Ansible and provide credentials inside the inventory file:

  ```ini
  [windows]
  ip_address
  [windows:vars]
  ansible_user=
  ansible_password=
  ansible_connection=winrm
  ansible_port=5986
  ansible_winrm_transport=basic
  ansible_winrm_server_cert_validation=ignore
  ```
Replace ip_address with the Windows machine's IP address, and provide the Windows authentication credentials for ansible_user and ansible_password.

### 3) Create configData for keystores in Windows machine in Workflows Authentication
 - Choose  **service** as Config Data and provide an object of keystore path and password inside the data field:


  ```
  {
    "C:/path/to/keytore.jks" : "password"
  }
  ```

### 4) Go to your imported workflow in Workflows section.
- Click **Run** defined under the actions tab.
- Provide the following input fields:
  - `concert_auth` (Provide the name of concertAPI key authentication which will be created at the time of installation)
  - `windows_auth` (Windows authentication name for ansible which is created in step 2)
  - `env_name`     (Name of environment where certificates are hosted)
  - `keystore_path` (Provide the location of .jks file)
  - `keystore_path` (Provide the password of keystore)
  
<img width="1722" alt="Screenshot 2025-07-17 at 4 47 32 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/1adafff8-f820-4199-bf97-a367327d04c7">

### 5) Run the Workflow.
- Navigate to the **Operations** tab to view the fetched certificates.

---
## Renewal Flow

### 6) Expose the renewal workflow by clicking on the 'expose externally' tab under **Actions** next to the workflow.
- Define the reference name by which it should be shown.
- Define whether it should be run asynchronously or synchronously.
  
  <img width="1728" alt="Screenshot 2025-07-17 at 4 48 01 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/605ca62d-64f7-49e3-a3ba-d280d76d1356">

### 7) Set the automation rule for Renewal
- Choose the workflow reference: 
  **/Windows_Keystore_Cert_Renewal**
- Provide the following input fields:
  - `passwordMap`  (Config data created in step 3)
  - `service_auth` (Windows authentication name for ansible which is created in step 2)
  - `validity`     (Validity of new certificate to be renewed)
  - `tomcat`       (Provide the location of tomcat)

<img width="1726" alt="Screenshot 2025-07-17 at 4 48 26 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/219642fc-5ec2-4634-b0e4-fe289c84ab33">

### 8) Run the Discovery workflow to trigger Renewal

- This will trigger the renewal endpoint if any certificate is eligible for renewal.
- The old certificate will be revoked in the Windows machine, and a new one will be created.

### 9) Fetch the Latest Certificates
- Run the discovery workflow again to retrieve the newly issued certificates.

---

This document provides a step-by-step guide to setting up Windows RDP certificates in java keystore auto-remediation using Ansible in Concert Workflows.



# Fetch All Kubernetes Certificates using API and Ingest into IBM Concert

## Prerequisites
Ensure that the Kubernetes cluster contains one or more certificates located in geo-specific namespaces or regions relevant to your use case.

## Setup Workflow

### 1) Import the Workflow
- Import the workflow in Concert Workflows.

### 2) Create Authentication for Kubernetes in Workflows
- Choose **service** as Kubernetes and provide credentials 
  
### 3) Go to your imported workflow in Workflows section.
- Click **Run** defined under the actions tab.
- Provide the following input fields:
  - `Concert_auth` (Provide the name of concertAPI key authentication which will be created at the time of installation)
  - `Environment name`
  - `Service_auth` (Kubernetes authentication name which is created in step 2)
  
<img width="1696" alt="Screenshot 2025-07-23 at 11 44 57 AM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/513eeddd-9f8d-44bd-a8ec-8ac4494fb6ea">


### 4) Run the workflow.
- Navigate to the **Operations** tab to view the fetched certificates.




# Fetch All Certificates for AWS using certificate manager and Ingest into IBM Concert

## Prerequisites
Ensure that the AWS certificate manager contains one or more certificates located in regions relevant to your use case.

## Setup Workflow

### 1) Import the Workflow
- Import the workflow in Concert Workflows.

### 2) Create Authentication for Amazon Web Services certificate in Workflows
- Choose **service** as Amazon Web Services and provide credentials 
  
### 3) Go to your imported workflow in Workflows section.
- Click **Run** defined under the actions tab.
- Provide the following input fields:
  - `Concert_auth` (Provide the name of concertAPI key authentication which will be created at the time of installation)
  - `Environment name`
  - `region` (AWS region code for the target account (e.g., us-east-1, us-east-2, eu-west-1, etc.).
  - `Service_auth` (AWS authentication name which is created in step 2)
  
<img width="1696" alt="Screenshot 2025-07-23 at 11 47 08 AM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/b8c85b56-12b3-40d0-9dc8-247e34b583b8">


# IBM data power - Certificate Auto-Remediation
This workflow lists all certificates used by services in IBM data power and performs rotation only for self-signed certificates that are eligible for renewal.
## Prerequisites
nil

## Setup Workflow

### 1) Import the Workflow
- Import the workflow inside the **Certificates** folder in Concert Workflows.

### 2) Create Authentication for IBM Data power in Workflows
- Choose **service** as **Basic  Authentication** and provide Ibm data power machine hostname, username and password
<img width="616" alt="image" src="https://github.ibm.com/roja/concert-workflows/assets/464491/eff4f412-c4fc-4894-9d7b-5caa14a9feb2">

 - Create a SSH authentication with Hostname and password (for renewal)
  
### 3) Go to your imported workflow in Workflows section.
- Click **Run** defined under the actions tab.
- Provide the following input fields:
  - `Concert_auth` (Provide the name of concertAPI key authentication which will be created at the time of installation)
  - `Environment name`
  - `Service_auth` (Ibm data power basic authentication name which is created in step 2)
  - `Host name`
    
  <img width="1727" alt="Screenshot 2025-07-17 at 5 00 49 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/e12e9879-dffa-4c41-8e26-803b776648a3">


### 4) Run the workflow.
- Navigate to the **Operations** tab to view the fetched certificates.

---
## Renewal Flow

### 5) Expose the renewal workflow by clicking on the 'expose externally' tab under **Actions** next to the workflow.
- Define the reference name by which it should be shown.
- Define whether it should be run asynchronously or synchronously.

  <img width="1728" alt="Screenshot 2025-07-17 at 5 02 27 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/af35fc7d-4cbf-4a1b-ba05-2d8a8f7cf011">

### 6) Set the automation rule for Renewal
- Choose the workflow reference: 
  **/IBM_data_renewal**
- - Provide the following input fields:
  - `Service_auth` (Ibm data power basic authentication name which is created in step 2)
  - `Power_auth`( IB data power SSH authentication)
  - `Host name`
  
  <img width="1728" alt="Screenshot 2025-07-17 at 5 03 02 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/1b0737f1-0792-4c05-aa78-c1a07fe0d0af">

### 7) Run the Discovery workflow to trigger Renewal
- This will trigger the renewal endpoint if any certificate is eligible for renewal.
- The old certificate will be revoked in the Windows machine, and a new one will be created.

### 8) Fetch the Latest Certificates
- Run the discovery workflow again to retrieve the newly issued certificates.


---
# AWS Secret Manager - Certificate Discovery

This workflow lists all the certificates stored in AWS Secrets Manager

## Setup Workflow

### 1) Import the Workflow
- Import the workflow in Concert Workflows.

### 2) Create Authentication for AWS Secrets Manager in Workflows
- Choose **service** as Amazon Web Services and provide credentials of each parameter:
  ```
     Access key -
     Secret Access key - 
     Session token(optional) -
enable overridable option for all the parameters.

### 3) Go to your imported workflow in Workflows section
- Click **Run** defined under the actions tab.
- Provide the following input fields:
  - `Concert_auth` (Provide the name of concertAPI key authentication which will be created at the time of installation)
  - `Service_auth` (AWS Secrets Manager authentication name which is created in step 2)
  - `region` (AWS region code for the target account (e.g., us-east-1, us-east-2, eu-west-1, etc.).
  - `Environment name`

<img width="1710" alt="Screenshot 2025-07-23 at 11 50 57 AM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/a64f6c78-43a9-4631-895f-804c8eab3f31">


### 4) Run the workflow.
- Navigate to the **Operations** tab to view the fetched certificates.


This document provides a step-by-step guide to setting up AWS Secrets manager certificate Discovery Concert Workflows.

# Fetch All Kubernetes Certificates using kube admin and Ingest into IBM Concert

## Prerequisites
Ensure that the Kubernetes cluster contains one or more certificates located in geo-specific namespaces or regions relevant to your use case.

## Setup Workflow

### 1) Import the Workflow
- Import the workflow in Concert Workflows.

### 2) Create Authentication for SSH in Workflows
- Choose **service** as SSH and provide credentials 
  
### 3) Go to your imported workflow in Workflows section
- Click **Run** defined under the actions tab.
- Provide the following input fields:
  - `Concert_auth` (Provide the name of concertAPI key authentication which will be created at the time of installation)
  - `Environment name`
  - `Service_auth` (SSH authentication name which is created in step 2)
  - `dir` (mention the directory where the certificates are residing)
  
<img width="1712" alt="Screenshot 2025-07-23 at 11 54 14 AM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/365be03d-45de-46a0-8e4f-f0a3ea49932b">


### 4) Run the workflow.
- Navigate to the **Operations** tab to view the fetched certificates.


# Renew All Kubernetes Certificates using kube admin in IBM Concert**

## Prerequisites
Ensure that certificates are already loaded into IBM concert.

## Setup Workflow

### 1) Import the Workflow
- Import the workflow in Concert Workflows.

### 2) Create Authentication for SSH in Workflows
- Choose **service** as SSH and provide credentials
  
### 3) Create an Ingestion Job
- This job  will renew expired and nearly expiring certificates in Kubernetes cluster.
- Choose the workflow reference: 
  **User/discover_and_renew_certificates_using_kubeadm/Batch renewal of Concert certificates managed by Workflows**
- Provide the following input fields:
  - `certificates` (Provide the certificates list in this format " {"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"owner": {"type":"string"},"issuer":{"type":"string"},"serial_number":{"type":"string"},"validity_end_date":{"type":"number"},"dns_names":{"type":"string"},"namespace":{"type":"string"},"environment":{"type":"array","items":{"type":"string"}},"metadata":{"type":"object","properties":{"rna":{"type":"boolean","enum":[true]},"rna_service":{"type":"string","examples":["kubernetes_kubeadm"]},"rna_file":{"type":"string","examples":["/etc/kubernetes/pki/apiserver-kubelet-client.crt"]}}}}}} ")
  - `Service_auth` (SSH authentication name which is created in step 2)
 
  
### 4) Create an Automation Rule
![image](https://github.ibm.com/roja/concert-workflows/assets/388298/12071f26-4d30-4fa6-9063-0863b90b2075)



### 5) Run the Ingestion Job which will inturn trigger the automation rule
- Navigate to the **Operations** tab to view the fetched certificates.

---
# Public Access Point Discovery Workflow - OCP and Kubernetes

This workflow discovers Public Access Points for Certificates and ingests them into Concert - 

  1. For OCP:
  Using the Routes
  2. For Kubernetes:
  Using the Ingress

### Setup and Run Workflow
1. **Create OCP/Kubernetes Authentication** 
2. **Create Concert Authentication** 
3. **Provide the rest of the inputs** (described below).

  <img width="1726" alt="Screenshot 2025-07-23 at 12 06 32 PM" src="https://github.ibm.com/roja/concert-workflows/assets/462734/0d914f1c-e41b-4dfd-900d-b88d44c39d4d">
   
5. **Save and run** the workflow.

### Inputs to the Workflow 
1. For OCP 


`concertAuth` - IBM Concert API Key Auth in Workflows.

![image](https://github.ibm.com/roja/concert-workflows/assets/455197/12778b07-a8dd-40cb-a04b-c0c0fb397191)


Host: The hostname of the VM like `concert-test.fyre.ibm.com`
API key: The API key of the Concert Instance
API Key Type: C_API_KEY for VM
Instance ID: The instance id for the Concert Instance

`serviceAuth` - OCP Auth

![image](https://github.ibm.com/roja/concert-workflows/assets/455197/d6ccb9a3-cc5a-4a1b-b421-1f980b2d57f6)

```
Protocol: The protocol of OCP API server like https
Host: OCP host name
Port: The port of OCP account
API Key: The API Key of the OCP account
```

`envName` - Enivronment name to ingest data in Concert like `"prod"`,`"test"`

`apiServer` - API Server of the cluster

`systemType` - It indicates weather workflow is to be executed for OCP or Kubernetes. It is an enum input with values `"ocp"`, `"kubernetes"`. For OCP value will be `"ocp"`

**All the above inputs are mandatory for both OCP and Kubernetes Workflow execution.**

Optional Input - 

`namespaces` - Array of Namespaces for which Public Access Point is to be discovered in OCP.

2. For Kubernetes

`concertAuth` - IBM Concert API Key Auth in Workflows.

Same as above

`serviceAuth` - Kubernetes Auth

![image](https://github.ibm.com/roja/concert-workflows/assets/455197/07230dd8-496f-4f7c-a33a-393ef1f74cbe)

```
Protocol: The protocol of Kubernetes API server like https
Host: Kubernetes host name
API Key: The API Key of the Kubernetes account
```

`envName` - Enivronment name to ingest data in Concert like `"prod"`,`"test"`

`apiServer` - API Server of the cluster

`systemType` - It indicates weather workflow is to be executed for OCP or Kubernetes. It is an enum input with values `"ocp"`, `"kubernetes"`. For Kubernetes value will be `"kubernetes"`

Optional Input - 

`namespaces` - Array of Namespaces for which Public Access Point is to be discovered in OCP.


NOTE - If no namespaces([]) or empty namespace([""]) is given as input to the workflow, then workflow will discover public access points for all the namespaces.

### After configuring all the necessary input variables and authentication details, save the workflow.
#### Click Run to execute the workflow.
After the execution of the Workflow, the certificates with public access points will be ingested to Concert. The certificates will be available at `Dimension > Operation` tab

---
# Discover Certificates Using Network Scan

This workflow discovers Certificates from open ports of network scan and ingests them into Concert - 


### Setup and Run Workflow
1. **Create Ansible Authentication** 
2. **Create Concert Authentication** 
3. **Provide the rest of the inputs** (described below).
4. **Save and run** the workflow.

### Inputs to the Workflow 

`concertAuth` - Hub Self Auth of IBM Concert

`ansibleAuth` - Authentication of Ansible VM.

`envName` - Enivronment name to ingest data in Concert like `"prod"`,`"test"`

`portArray` - Array of the ports to be scanned.

NOTE - If no port is provided as input then the workflow will scan for all the open ports.

### After configuring all the necessary input variables and authentication details, save the workflow.
#### Click Run to execute the workflow.
After the execution of the Workflow, the certificates after network scan will be ingested to Concert. The certificates will be available at `Dimension > Operation` tab
