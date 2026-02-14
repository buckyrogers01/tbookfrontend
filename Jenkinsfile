pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/buckyrogers01/tbookfrontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                sudo rm -rf /var/www/admin/*
                sudo cp -r build/* /var/www/admin/
                sudo systemctl restart nginx
                '''
            }
        }
    }
}
