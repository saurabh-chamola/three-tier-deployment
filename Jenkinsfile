pipeline {
    agent any

    environment {
        application_repo = 'https://github.com/saurabh-chamola/three-tier-deployment.git'
        kubernetes_repo = 'https://github.com/saurabh-chamola/kubernetes.git'
        docker_username = 'saurabh0010'
        frontend_image = "${docker_username}/frontend-beta:${env.BUILD_NUMBER}"
        backend_image = "${docker_username}/backend-beta:${env.BUILD_NUMBER}"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Application Code') {
            steps {
                git url: "${application_repo}", branch: 'main'
            }
        }


        stage('Trivy: Vulnerability Scan') {
            steps {
                script {
                    sh 'trivy fs . > trivy-report.txt'
                    sh 'echo "\n=== TRIVY VULNERABILITY REPORT ==="'
                    sh 'cat trivy-report.txt'
                    archiveArtifacts artifacts: 'trivy-report.txt', allowEmptyArchive: true
                }
            }
        }

        stage('Docker: Build Images (Parallel)') {
            parallel {
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh "docker build -t ${backend_image} ."
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh "docker build -t ${frontend_image} ."
                        }
                    }
                }
            }
        }

        stage('Run Containers for Testing') {
            steps {
                script {
                    echo "Running containers for quick testing..."
                    sh 'docker compose up -d'
                    sh 'sleep 15'
                    sh 'docker ps'
                    sh 'docker compose down'
                }
            }
        }

        stage('Docker: Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-cred', usernameVariable: 'dockerUser', passwordVariable: 'dockerPass')]) {
                    sh """
                        echo "${dockerPass}" | docker login -u "${dockerUser}" --password-stdin
                        docker push ${backend_image}
                        docker push ${frontend_image}
                    """
                }
            }
        }

        stage('Checkout Kubernetes Repo') {
            steps {
                dir('kubernetes-repo') {
                    git url: "${kubernetes_repo}", branch: 'main'
                }
            }
        }

        stage('Update Kubernetes YAML Files') {
            steps {
                dir('kubernetes-repo') {
                    script {
                        sh 'which yq || sudo apt-get install -y yq'
                        sh "yq eval -i '.spec.template.spec.containers[0].image = \"${backend_image}\"' kubernetes/backend.yaml"
                        sh "yq eval -i '.spec.template.spec.containers[0].image = \"${frontend_image}\"' kubernetes/frontend.yaml"
                    }
                }
            }
        }

        stage('Commit & Push Kubernetes Changes') {
            steps {
                dir('kubernetes-repo') {
                    withCredentials([gitUsernamePassword(credentialsId: 'github-cred', gitToolName: 'Default')]) {
                        sh '''
                            git config --global user.email "ci@wanderlust.com"
                            git config --global user.name "CI Bot"
                            git add .
                            git commit -m "CI/CD: Updated images to BUILD_NUMBER=$BUILD_NUMBER" || echo "No changes to commit"
                            git push origin main
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            emailext(
                to: 'sourabhchamola5@gmail.com',
                subject: "✅ CI/CD Pipeline Success - Build ${env.BUILD_NUMBER}",
                body: """
                    <html>
                    <body>
                        <h2 style='color:green;'>CI/CD Pipeline Completed Successfully</h2>
                        <p><b>Build ID:</b> ${BUILD_ID}</p>
                        <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                        <p><b>Trivy Report:</b> <a href='${env.BUILD_URL}artifact/trivy-report.txt'>View Trivy Report</a></p>
                    </body>
                    </html>
                """,
                mimeType: 'text/html'
            )
        }
        failure {
            emailext(
                to: 'sourabhchamola5@gmail.com',
                subject: "❌ CI/CD Pipeline FAILED - Build ${env.BUILD_NUMBER}",
                body: """
                    <html>
                    <body>
                        <h2 style='color:red;'>CI/CD Pipeline Failed</h2>
                        <p><b>Build ID:</b> ${BUILD_ID}</p>
                        <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    </body>
                    </html>
                """,
                mimeType: 'text/html'
            )
        }
    }
}
