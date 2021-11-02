// Loop through the no following users
          postsRef
            .once("value", (allUsers) => {
              // First we loop on the all users section
              let allUsersVar = allUsers.val();
              let allUsersVarArray = Object.values(allUsersVar);
              let arrayUsers = [];

              // We loop 5 times the object, so we ended passing 5 users to the arrayUsers
              do {
                for (let index = 0; index <= 5; index++) {
                  let user =
                    allUsersVarArray[
                      Math.floor(Math.random() * allUsersVarArray.length)
                    ];
                  arrayUsers.push(user);
                  arrayUsers.length = 5;
                }
                arrayUsers = arrayUsers.filter(function (item, pos) {
                  return arrayUsers.indexOf(item) == pos;
                });
              } while (arrayUsers.length < 5);
              // We loop every user that is in the array in order to get 1 post of each one of them
              let randomNumber = Math.floor(Math.random() * arrayUsers.length);
              arrayUsers.forEach((User) => {
                // For every user we must have one post
                if (Object.values(User).length > 1) {
                  this.postsExplore.push(Object.values(User)[randomNumber]);
                } else {
                  this.postsExplore.push(Object.values(User)[0]);
                }
              });
            })
            .then(() => {
              this.postsFollowingStatus = true;
            })
            .catch(() => {
              this.postsFollowingStatus = false;
            });






            ---------------


            postsRef
            .once("value", (allUsers) => {
              // First we loop on the all users section
              let allUsersVar = allUsers.val();
              let allUsersVarArray = Object.values(allUsersVar);
              let arrayUsers = [];

              // We loop 5 times the object, so we ended passing 5 users to the arrayUsers
              do {
                for (let index = 0; index <= 5; index++) {
                  let user =
                    allUsersVarArray[
                      Math.floor(Math.random() * allUsersVarArray.length)
                    ];
                  arrayUsers.push(user);
                  arrayUsers.length = 5;
                }
                arrayUsers = arrayUsers.filter(function (item, pos) {
                  return arrayUsers.indexOf(item) == pos;
                });
              } while (arrayUsers.length < 5);
              // We loop every user that is in the array in order to get 1 post of each one of them
              let lastIndexOfArray = Math.floor(
                Math.random() * arrayUsers.length
              );
              arrayUsers.forEach((User) => {
                // For every user we must have one post
                if (Object.values(User).length > 1) {
                  this.postsExplore.push(Object.values(User)[lastIndexOfArray]);
                } else {
                  this.postsExplore.push(Object.values(User)[0]);
                }
              });
            })
            .then(() => {
              this.postsFollowingStatus = true;
            })
            .catch(() => {
              this.postsFollowingStatus = false;
            });