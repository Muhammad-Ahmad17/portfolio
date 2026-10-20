# Interview prep — DevOps CV

Private notes for you. This file is not part of the site. Do not send it with the CV.

The CV they have is `public/cv/Muhammad_Ahmad_Resume_DevOps.pdf`. Live demos are expired. If they ask to see something running, open the GitHub repo, not the old URL.

Say this if you do not know an answer: "I have not done that yet. Here is the closest thing I have built." That is better than guessing.

## Do not claim these

- [ ] Prometheus, Grafana, or any monitoring setup
- [ ] Kubernetes in production, or writing real manifests from memory
- [ ] Terraform applied to a real account (you only know the idea)
- [ ] FastAPI services, Postgres, or a dashboard on IntelliSafe (not built yet)
- [ ] Jetson flashed and deploying the FYP (still ahead)
- [ ] A live site. The demos are down.

## 30-second opening

Computer engineering student at COMSATS, 7th semester, CGPA 3.54. Looking for part-time or internship DevOps or cloud work. Strongest on Linux. I have shipped a Docker app with a GitHub Actions pipeline to Oracle Cloud, a small AWS serverless API (API Gateway, Lambda, DynamoDB, S3), and I am building IntelliSafe, a site-safety system that streams camera events over MQTT into Redis.

## Internship — Innovative Saudia (Jul–Aug 2025)

Repo: https://github.com/Muhammad-Ahmad17/Internship

Be ready to say it was mostly learning plus small hands-on tasks, not a production on-call role.

- [ ] What you did: Linux, Docker, Git, a first EC2, S3, and the serverless user API.
- [ ] EC2: you launched an instance, chose an AMI and instance type, attached a security group, and connected with SSH. A security group is the firewall: which ports, from which IPs.
- [ ] S3: object storage. You used it for files and for hosting the React frontend as a static website.
- [ ] Lambda path, in order: browser calls API Gateway, API Gateway invokes the Lambda, Lambda reads DynamoDB, response goes back. You do not manage a server for that function.
- [ ] Why Lambda instead of EC2: no server to patch for this small read API. EC2 was the "log into a machine" exercise. Lambda was the API.
- [ ] Open the daily log and point at one real day if they ask for proof.

## Project — CI/CD and Docker

Repo: https://github.com/Muhammad-Ahmad17/root

Open the workflow file before the interview and read it once. You should be able to point at each step.

- [ ] The path: git push, GitHub Actions builds a Docker image, pushes it to a registry, then deploys to Oracle Cloud. Nginx serves the app. Same Docker setup locally and on the server.
- [ ] Confirm the deploy step in the workflow. The CV says it deploys over SSH. If the file does something else, describe the file, not the CV sentence.
- [ ] Dockerfile: a layer is one instruction (`FROM`, `COPY`, `RUN`). Docker caches unchanged layers. `.dockerignore` keeps `node_modules` and `.env` out of the image.
- [ ] Image vs container: the image is the built package. The container is a running copy of that image.
- [ ] Why Docker: the server runs the same thing you ran locally, so "works on my machine" stops being the deploy method.
- [ ] Nginx: it listens on 80/443 and forwards traffic to the app container. You do not need to recite a full config. Know that it is the reverse proxy in front of the app.
- [ ] GitHub Actions: a workflow is YAML in `.github/workflows`. Secrets (registry password, SSH key) live in repo secrets, not in the file.
- [ ] If the pipeline fails: open the Actions log, read the red step, fix that step, push again.

## Project — IntelliSafe (in progress)

Repo: https://github.com/Muhammad-Ahmad17/fyp

Describe the idea. Do not split "my part / his part" unless they ask who wrote the model.

- [ ] Idea: a workplace camera detects workers, a missing helmet or vest, and hazards (fire, smoke, spill). Those events go over MQTT into Redis Streams for live alerts and a dashboard.
- [ ] MQTT: devices publish messages to a topic. Mosquitto is the broker. Other services subscribe.
- [ ] Redis Streams: a log of events (`XADD` to write, `XRANGE` to read). The stream used in the proof is `ppe:alerts`.
- [ ] What actually runs today: `docker compose` brings up Mosquitto, Redis, a bridge, and a simulator. The simulator publishes events and they show up in Redis. Say this if they ask "is it finished?"
- [ ] What is not finished: the trained camera model, the dashboard, and running it on a Jetson.
- [ ] If they ask who trained the vision model: your teammate owns that. You own the platform path. Only say this if they ask.

## Project — Serverless user processing

Repo: https://github.com/Muhammad-Ahmad17/getApiForUserData

This is the same Lambda work as the internship. If they ask why it appears twice, say the internship is where you built it, and this repo is the project.

- [ ] React frontend hosted on S3 as a static website.
- [ ] API Gateway HTTP endpoint triggers Lambda.
- [ ] Lambda reads items already stored in DynamoDB. It is a read path, not a full user-signup system.
- [ ] Name the four AWS pieces in order: S3, API Gateway, Lambda, DynamoDB.

## Project — Sakura Corporation

Repo: https://github.com/Muhammad-Ahmad17/sakura-corporation-network-design

This is Cisco Packet Tracer coursework, not a cloud network.

- [ ] Topology: headquarters and two branches, plus an ISP link.
- [ ] VLAN: splits one switch into separate networks (for example a server VLAN). A trunk carries multiple VLANs between switch and router.
- [ ] Subnetting: you sized small subnets, including `/30` links for the WAN (two usable addresses).
- [ ] OSPF: routers share routes inside area 0. The HQ router sends a default route toward the ISP (`default-information originate`).
- [ ] You can open `conf/r-hq` and explain hostname, VLAN interface, serial WAN IPs, and the OSPF networks.

## Skills — be able to show, not only name

### Linux (your strongest)

- [ ] `ssh user@host`
- [ ] `ls -l` and what `chmod` changes
- [ ] `systemctl status <service>` and `journalctl -u <service>`
- [ ] `ps`, `top`, `df -h`, `ss -lntp` (what is listening)
- [ ] A permission error means the user running the process cannot read or write that file.

### Docker and Compose

- [ ] `docker build`, `docker run`, `docker ps`, `docker logs`
- [ ] `docker compose up --build` starts the services in the compose file
- [ ] Compose file = which images, which ports, which network they share

### Git

- [ ] `git status`, `git add`, `git commit`, `git push`
- [ ] A branch is a line of work. A pull request is how you ask to merge it.

### AWS, only what you used

- [ ] EC2: virtual machine. Security group: its firewall.
- [ ] S3: files, and static website hosting.
- [ ] Lambda: a function AWS runs when API Gateway calls it. You do not SSH into it.
- [ ] API Gateway: the HTTP front door for Lambda.
- [ ] DynamoDB: a NoSQL table. You read items by key.

### Networking, only Sakura

- [ ] VLAN, trunk, subnet, OSPF area 0, default route. Definitions are in the Sakura section above.

### Say "learning" if they ask

- [ ] Terraform: you declare servers and networks in files and apply them, instead of clicking in the console. You have not applied this on a real project yet.
- [ ] Kubernetes: runs containers across machines. A pod is the running unit. You have the idea, not a cluster you operate.
- [ ] CI/CD, Dockerfiles, and Nginx: you built them, with AI helping you write the files. You can still walk the repo. Do not hide that if they ask how you wrote it. Do say you understand the pipeline because you ran it.

## Questions they may ask you

- [ ] Tell me about yourself. Use the 30-second opening.
- [ ] Walk me through your CI/CD pipeline. Use the repo, step by step.
- [ ] What is Docker and why did you use it?
- [ ] What happens when a request hits your Lambda API?
- [ ] What is a security group?
- [ ] How do you debug a Linux service that is down? (`systemctl`, `journalctl`, is the port open)
- [ ] What is MQTT? What is a Redis stream?
- [ ] Are you comfortable on-call / production? Honest answer: not yet. You want a part-time or internship seat to learn that with a team.
- [ ] What are you learning next? Terraform and Kubernetes, after the tools already on the CV.

## Questions you can ask them

- [ ] Is this part-time, an internship, or a fresher seat?
- [ ] What would I actually do in the first month?
- [ ] Which cloud do you use, and is the work mostly CI/CD, Linux servers, or cloud console?
- [ ] Who would I learn from day to day?
