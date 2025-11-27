FRONTEND- cd frontend npm install npm run dev

BACKEND- mvn spring-boot:run

MAKE SURE MYSQL IS OPEN AND turotdb IS RUNNING

DOCKER- docker compose build
docker tag cicd-ems-backend:latest nithin314149/cicd-ems-backend:latest
docker tag cicd-ems-frontend:latest nithin314149/cicd-ems-frontend:latest
docker login
docker push nithin314149/cicd-ems-backend:latest
docker push nithin314149/cicd-ems-frontend:latest
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml
kubectl get svc

kubectl get ingress
