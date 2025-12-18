
# Prometheus NFR Workflow Integration with Concert Workflows

## 1. Overview
The **Prometheus NFR Workflow** is designed to collect **Non-Functional Requirements (NFRs)** directly from Prometheus and load them into IBM Concert for posture and assessment creation.  

- Prometheus must be installed on a **VM**.  
- Applications must expose `/metrics` endpoints.  
- The workflow fetches metrics, maps them to onboarded applications in Concert, and computes NFR values such as:
  - Availability  
  - Error Rate  
  - Latency  
  - Throughput  
  - Disk/Swap Usage  

---

## 2. Prerequisites for Workflow Execution

### 2.1 Install Prometheus
- Install Prometheus on a VM.  
- Configure `prometheus.yml` to scrape metrics from your target applications.  



## 2. Prerequisites for Workflow Execution

### 2.1 Install Prometheus
- Install Prometheus on a VM.  
- Configure `prometheus.yml` to scrape metrics from your target applications.  

**Example scrape config:**

scrape_configs:
  - job_name: "guestbook"
    static_configs:
      - targets: ["<guestbook_app_host>:<port>"]

  - job_name: "node_exporter"
    static_configs:
      - targets: ["<vm_host>:9100"]

  - job_name: "prometheus"
    static_configs:
      - targets: ["<prometheus_vm_host>:9090"]

### 2.2 Upload Applications to Concert
Upload the following applications into **Concert Application Inventory**:

- `guestbook` – version `1.29.1`  
- `node_exporter` – version `1.8.1`  
- `prometheus` – version `2.46.0`  

⚠️ Ensure the **application names and versions** match the Prometheus job labels.

---

## 2.3 Create a Profile
Create a **Profile** in Concert that contains only Prometheus-supported NFRs:

- Availability  
- Error Rate  
- Latency  
- Throughput  
- Disk/Swap Usage  

---
## 3. Create Authentication Configurations
To authenticate with Concert and Prometheus, follow these steps:

### 3.1 Concert Authentication
- Go to **Workflows > Authentications** and create an authentication for Concert.  
- You can use either:  

**IBM Hub - Self (Recommended):**  
Go to the **Workflows > Authentications** tab, select **IBM Hub - Self** as the service, provide a name, and click **Create**.  

**IBM Concert API Key:**  
Go to the **Workflows > Authentications** tab, select **IBM Concert API Key** as the service, provide the required details, and click **Create**.  

### 3.2 Prometheus Authentication
- Go to **Workflows > Authentications > Create Authentication**.  
- Select **Service = Prometheus**.  
- Fill in the following fields:  

| Field      | Value                                                                 |
|------------|----------------------------------------------------------------------|
| **Protocol** | `http` or `https`                                                    |
| **Host**     | Prometheus VM host (e.g., `testvm-1.fyre.ibm.com`)                   |
| **Port**     | usually `9090`                                                       |
| **Username** | (optional) only if Prometheus is secured with Basic Auth             |
| **Password** | (optional) only if Prometheus is secured with Basic Auth             |

- Click **Test Authentication** to verify the connection.  
- Save the authentication with a clear name, e.g., `PrometheusAuth`.  

---

## 4. Inputs to the Workflow

### 4.1 Input Variables
- **configAuth** – Config authentication for Concert.  
- **in_concert_key** – Path to Concert API key authentication.  
- **in_profile_name** – Profile name associated with the posture.  
- **application_name_version** – JSON mapping of Concert applications to Prometheus jobs.  

---

## 5. Run Workflow
1. Configure all input variables (`configAuth`, `in_concert_key`, `in_profile_name`, `application_name_version`).  
2. Save the workflow.  
3. Run the workflow.  

The workflow will:  
- Discover Prometheus targets.  
- Match them with Concert applications using `application_name_version`.  
- Fetch the latest `/metrics` data.  
- Compute NFR values.  
- Create posture and assessments in Concert.  

---
## 6. Notes  
- Metrics are collected only from the `/metrics` endpoint of the targets.  
- Supported NFRs currently include:  
  - Availability  
  - Error Rate  
  - Latency  
  - Throughput  
  - Disk/Swap Usage  
- **Unreachable Applications**:  
  - If Prometheus cannot reach an application (e.g., app is down, wrong port, or misconfigured target), the workflow marks the app as *unreachable*.  
  - These apps will **not** proceed to NFR assessment creation.  
  - They are still reported in the final output with details:  
    - `health = "down"`  
    - `reachable = false`  
    - `reason = "Application not reachable from Prometheus"`.  

---

## 7. Example Workflow Input Screen
![image](https://github.ibm.com/roja/concert-workflows/assets/481485/6e3c7f07-f99c-415e-818e-6044ebc25d3a)

---

## 8. Example Output

### 8.1 Assessment ID
After execution, the workflow output will display the generated **assessment_id**.  

![image](https://github.ibm.com/roja/concert-workflows/assets/481485/b0a7c884-35f7-45e5-b1c8-3d7fd65711ff)

---

### 8.2 View Metrics in Concert
Navigate to:  
**Concert → Dimensions → Resilience → Posture → Assessment**  

You will see the NFR metrics ingested from Prometheus.  

![image](https://github.ibm.com/roja/concert-workflows/assets/481485/26295753-5568-4c20-907c-3e946fff450a)


