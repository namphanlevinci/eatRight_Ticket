pipeline {
  agent {
    docker {
      image 'harrylehuu/levinci_node:14.17' 
      args '-u jenkins:jenkins'
    }

  }
  stages {
    stage('Get Atuthor') {
      steps {
        script {
          env.GIT_COMMIT_MSG = sh (returnStdout: true, script: 'git log -1 --pretty=%B').trim()
          env.GIT_AUTHOR = sh (script: 'git log -1 --pretty=%cn ${GIT_COMMIT}', returnStdout: true).trim()
        }

      }
    }

    stage('Package Install') {
      steps {
        sh '''echo "NODE_OPTIONS=--max-old-space-size=4096" >> ~/.bash_profile
		. ~/.bash_profile
		npm install'''
      }
    }
	
	stage('Build dev') {
		when {
			branch 'dev'
		}
		steps {
			sh '''echo "NODE_OPTIONS=--max-old-space-size=4096" >> ~/.bash_profile
			. ~/.bash_profile
			CI=false npm run build
			cd build
			tar -cvf ${program_filename}.tar .
			mv ${program_filename}.tar ${WORKSPACE}'''
		}
    }

    stage('Build Staging') {
		when {
			branch 'staging'
		}
		steps {
			sh '''echo "NODE_OPTIONS=--max-old-space-size=4096" >> ~/.bash_profile
			. ~/.bash_profile
			CI=false npm run build:staging
			cd build
			tar -cvf ${program_filename}.tar .
			mv ${program_filename}.tar ${WORKSPACE}'''
		}
    }
	
	stage('Build Production') {
		when {
			branch 'production'
		}
		steps {
			sh '''echo "NODE_OPTIONS=--max-old-space-size=4096" >> ~/.bash_profile
			. ~/.bash_profile
			CI=false npm run build:prod
			cd build
			tar -cvf ${program_filename}.tar .
			mv ${program_filename}.tar ${WORKSPACE}'''
		}
    }
	
	stage('Deploy to Dev Eatright Waiter') {
		when {
			branch 'dev'
		}
		steps {
			sshPublisher(publishers: [sshPublisherDesc(configName: 'eatright_dev', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''set -xe
			source ~/.bash_profile
			#Source file
			origin_filename=${ER_dev_target}${ER_dev_filename}.tar
			#Unzip file
			tar -xvf ${origin_filename} -C ${ER_dev_waiter_webroot}
			#After copying, delete the source file
			if [ -f "${origin_filename}" ];then
				rm -f ${origin_filename}
				echo "${origin_filename} delete success"
			fi
			#Write the code for your startup program.
			echo "completed"''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'eatright.tar')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
		}
	}
	
    stage('Deploy to Staging Eatright waiter') {
			when {
				branch 'staging'
			}
			steps {
				sshPublisher(publishers: [sshPublisherDesc(configName: 'staging_eatright', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''set -xe
				source ~/.bash_profile
				#Source file
				origin_filename=${ER_stag_target}${ER_stag_filename}.tar
				#Unzip file
				tar -xvf ${origin_filename} -C ${ER_stag_waiter_webroot}
				#After copying, delete the source file
				if [ -f "${origin_filename}" ];then
					rm -f ${origin_filename}
					echo "${origin_filename} delete success"
				fi
				#Write the code for your startup program.
				echo "completed"''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'eatright.tar')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
			}
	}
	
	stage('Deploy to Production') {
		when {
			branch 'production'
		}		
		stages {
			stage('approve to deploy Production') {
				options {
					timeout(time: 180, unit: "SECONDS")
				}

				steps {
					input 'Click Process if you want to deploy!'
				}
			}
			stage('deploying to Production') {
				steps {
						sshPublisher(publishers: [sshPublisherDesc(configName: 'eatright_prod_fe', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''set -xe
						source ~/.bash_profile
						#Source file
						origin_filename=${ER_prod_target}${ER_prod_filename}.tar
						#Unzip file
						tar -xvf ${origin_filename} -C ${ER_prod_waiter_webroot}
						#After copying, delete the source file
						if [ -f "${origin_filename}" ];then
							rm -f ${origin_filename}
							echo "${origin_filename} delete success"
						fi
						echo "completed"''', execTimeout: 600000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'eatright.tar')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
				}
			}
		}
	}
	
  }
  environment {
    program_filename = 'eatright'
    BUILD_TRIGGER_BY = "${currentBuild.getBuildCauses()[0].shortDescription} / ${currentBuild.getBuildCauses()[0].userId}"
  }
}
