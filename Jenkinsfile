pipeline {
    agent any
    
    stages {
        stage('Code Checkout') {
            steps {
                checkout scm
                echo 'Code Checkout Completed'
            }
        }
        
        stage('Backend Setup') {
            steps {
                dir('backend') {
                    script {
                        echo 'Setting up Backend'
                        // Add actual commands later
                    }
                }
            }
        }
        
        stage('Frontend Setup') {
            steps {
                dir('frontend') {
                    script {
                        echo 'Setting up Frontend'
                        // Add actual commands later
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check logs for details.'
        }
    }
}