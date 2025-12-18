# EKS CloudWatch Workflow  

##  Purpose & Scope  
This workflow collects EKS cluster metrics from **AWS CloudWatch**, processes them into an assessment-ready format, and sends the results to an **external assessment API** for posture creation.  

The scope includes:  
- Fetching relevant metrics (CPU, memory, pods, nodes, replicas).  
- Transforming raw CloudWatch metrics into assessment schema.  
- Delivering data to the assessment service.  

---

##  References  
- [AWS CloudWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) – metric collection APIs  
- [EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html) – CloudWatch agent installation and configuration  
- Assessment API Documentation – endpoint specifications and payload format  

---

##  Context & Architecture  
- Runs inside **IBM Workflow environment**.  
- Integrates with AWS CloudWatch (EKS namespace).  
- Transforms metrics and posts results to the assessment API.  

---

## Pre-requisites  
1. EKS cluster must have **CloudWatch Agent installed** to expose metrics.  
2. A **profile** must be created using relevant **Non-Functional Requirements (NFRs)**.  
3. The application must exist in **IBM Concert**, as assessments are created only for available apps.  

---

##  NFRs Required for Profile Creation  

| NFR | Type | Target | Thresholds | Description | Library |
|-----|------|--------|-------------|-------------|----------|
| Workloads Missing CPU Limits | Integrity | 100 | 100, 75, 50, 25 | % of workloads missing CPU limits | Runtime Production Readiness Library |
| Containers Missing CPU Limit | Integrity | 100 | 100, 75, 50, 25 | % of containers missing CPU limits | Container Build Integrity Library |
| Containers Missing Memory Limit | Integrity | 100 | 100, 75, 50, 25 | % of containers missing memory limits | Container Build Integrity Library |
| Workloads Missing CPU Requests | Integrity | 100 | 100, 75, 50, 25 | % of workloads missing CPU requests | Runtime Production Readiness Library |
| Workloads Within 90% of CPU Limit | Integrity | 100 | 100, 75, 50, 25 | % of workloads running within 90% of CPU limit | Runtime Production Readiness Library |
| Workloads Missing Memory Requests | Integrity | 100 | 100, 75, 50, 25 | % of workloads missing memory requests | Runtime Production Readiness Library |
| Workloads Missing Memory Limits | Integrity | 100 | 100, 75, 50, 25 | % of workloads missing memory limits | Runtime Production Readiness Library |
| Workloads Within 90% of Memory Limit | Integrity | 100 | 100, 75, 50, 25 | % of workloads running within 90% of memory limit | Runtime Production Readiness Library |
| Replicas Allow Disruptions | Availability | 100 | 25, 50, 75, 100 | Avg. number of replicas & workloads with more than 3 replicas | Runtime Production Readiness Library |  

---

##  Input Fields  

| Field | Description |
|-------|-------------|
| **authKey** | Authentication key for AWS CloudWatch APIs |
| **region** | AWS region where EKS cluster is deployed (e.g., `us-east-1`) |
| **RelevantMetrics** | List of EKS/ContainerInsights metrics to collect and assess |
| **Clustername** | Name of the EKS cluster being monitored |
| **application_name** | Name of the application in IBM Concert for assessment storage |
| **application_version** | Version of the application in IBM Concert |
| **profile_name** | Profile name defining NFRs for evaluation |
| **ibm_concert_key** | API key/token for IBM Concert |
| **namespace** | AWS CloudWatch namespace (e.g., `ContainerInsights`) |

---

##  Workflow Blocks  

- **ListMetrics** – Query AWS CloudWatch for available metrics in EKS namespace.  
- **GetMetricData** – Retrieve metric values for relevant metrics.  
- **Transform Step** – Reformat raw metrics into assessment schema.  
- **POST API Call** – Send transformed data to the assessment service.  

---

##  Inputs, Variables & Secrets  

- **Inputs**  
  - EKS Cluster Name  
  - Namespace (AWS/EKS)  

- **Variables**  
  - Relevant metrics list (CPU, memory, pods, nodes, replicas)  

- **Secrets**  
  - AWS Access Key & Secret Key (CloudWatch access)  
  - API Token/Key (assessment API auth)  

---

##  Detailed Flow  

1. **Start Workflow** – Triggered manually or via schedule.  
2. **ListMetrics** – Fetch metric names from CloudWatch (EKS namespace).  
3. **GetMetricData** – Retrieve values for each relevant metric.  
4. **Transform Step** – Convert data to assessment schema (scaling if required).  
5. **Send to Assessment API** – POST transformed data; receive success/failure.  
6. **End Workflow** – Mark completion.  

---

##  Output Explanation  

The workflow produces an **assessment result** organized into categories:  

- **Container** → CPU & memory limits.  
- **Node** → CPU limit, CPU utilization, memory utilization, filesystem inodes.  
- **Pod** → CPU/memory requests, CPU/memory limits, utilization over limits.  
- **Replicas** → Desired vs. ready replica counts.  

It also computes **Assessment Metrics (KPIs)**:  
- % of containers/workloads missing CPU/memory limits/requests  
- % of workloads within 90% of CPU/memory limits  
- Average number of replicas & % of workloads with >3 replicas  

Finally, a **posture object** is generated with an `assessment_id` for tracking.  

---


---

## Relevant Metrics Considered  

The following metrics are currently being collected and assessed in the workflow:  

```json
{
    "container_cpu_limit": "AVG",
    "container_memory_limit": "AVG",
    "pod_cpu_request": "AVG",
    "pod_memory_request": "AVG",
    "node_cpu_limit": "AVG",
    "pod_cpu_limit": "AVG",
    "pod_cpu_utilization_over_pod_limit": "MAX",
    "node_cpu_utilization": "MAX",
    "node_memory_utilization": "MAX",
    "pod_memory_utilization_over_pod_limit": "MAX",
    "replicas_desired": "MIN",
    "replicas_ready": "MIN"
}
```

---

##  Note  
Right now, the workflow supports only the metrics required by the **current NFRs**.  
If new NFRs are introduced that require additional metrics, the workflow functions must be updated.  
