# Design and develop a Cloud Native solution

https://www.ibm.com/training/certification/C0007300

## Understand the main elements of a cloud native solution

https://www.ibm.com/cloud/learn/cloud-native

### Define Cloud Native

- What is cloud native
  - Cloud native refers less to where application resides and more to how it is built and deployed.
    - A cloud native application consists of discrete, reusable components knows as micro services that are designed to integrate into any cloud environment.
    - These micro services act as building blocks and are often packaged in containers.
    - Microservices work together as a whole to promise an application, yet each can be independently scaled, continuously improved, and quickly iterated through automation and orchestration processes.
    - The flexibility of each microservices adds to the agility and continuous improvement of cloud-native applications.
- Microservices and container
  - Microservices: 
    - It is a single application which is composed of **many smaller**, **loosely coupled** and **independently deployable** components or services.
    - These services comunicate through **REST APIs**, **event stream**, and **message brokers**.
    - They are a perfect match for automated, interactive delivery methodologies such as CI/CD or DevOps.
  - Containers: amplify the benifits of microservices
    - Consistent deployment and management experience across a hybird muticloud environment(public clouds, private clouds and on-permises infrastructure)
    - Usually uses orchestration platform(Kubernetes, Openshift,...) to automate container deployment and management at scale.

### Advantages and disadvantages

- Advantage
  - Easier to manage as iterative improments occur using Agile and DevOps processes.
  - Comprise individual micro services, it improve incrementally and automatically to continuously add new and improve application features.
  - Improvements can be made non-intrusively, causing no downtime or disruption of the end user experience.
  - Scaling up and downs proves easier with elastic infrastructure that underpins cloud native apps. 
  - The cloud native development process more closely matches the speed and innovation demanded by today's business environment.
- Disadvantage
  - Although microservices enable an iterative approach to application improvement, they also create the necessity of managing more elements. Rather than one large application, it becomes necessary to manage far more small, discrete services.
  - Cloud native apps demand additional toolsets to manage the DevOps pipeline, replace traditional monitoring structures, and control microservices architecture.
  - Cloud native applications allow for rapid development and deployment, but they also demand a business culture that can cope with the pace of that innovation.