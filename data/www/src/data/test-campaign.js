export const testCampaign = {
    "id": "demo-campaign",
    "name": "Demo Campaign",
    "paths": {
        "path-1": {
            "id": "path-1",
            "name": "Test Path",
            "path": [
                [0, 50],
                [50, 50],
                [100, 25],
                [150, 75],
                [200, 75]
            ]
        }
    },
    "creeps": {
        "basic": {
            "id": "basic",
            "name": "Basic Creep",
            "speed": 0.05,
            "maxHp": 10,
            "rewards": [
                ["money", 5],
                ["xp", 1]
            ]
        },
        "boss": {
            "id": "boss",
            "name": "Boss Creep",
            "speed": 0.02,
            "maxHp": 50,
            "rewards": [
                ["money", 20],
                ["xp", 5]
            ]
        }
    },
    "bullets": {
        "bullet-1": {
            "id": "bullet-1",
            "name": "Standard Bullet",
            "damage": 3,
            "speed": 0.4
        }
    },
    "towers": {
        "gun-1": {
            "id": "gun-1",
            "name": "Gun Tower",
            "nextId": null,
            "cost": 50,
            "sellPrice": 35,
            "bulletId": "bullet-1",
            "range": 100,
            "firingIntervalMs": 800
        }
    },
    "levels": {
        "level-1": {
            "id": "level-1",
            "name": "First Time Around",
            "lives": 20,
            "startMoney": 100,
            "pathIds": ["path-1"],
            "waves": [
                {
                    "creeps": [
                        {
                            "type": "group",
                            "startMs": 0,
                            "intervalMs": 800,
                            "pathId": "path-1",
                            "count": 3,
                            "creepId": "basic"
                        },
                        // spawns part way through the group above - cool!
                        {
                            "type": "creep",
                            "startMs": 1000,
                            "pathId": "path-1",
                            "creepId": "boss"
                        },
                        // test spawning after wave end
                        {
                            "type": "creep",
                            "startMs": 4100,
                            "pathId": "path-1",
                            "creepId": "boss"
                        },
                        // same time as a creep from the next wave
                        {
                            "type": "creep",
                            "startMs": 4900,
                            "pathId": "path-1",
                            "creepId": "boss"
                        },
                        // test spawning after *next* wave has also ended
                        {
                            "type": "creep",
                            "startMs": 7100,
                            "pathId": "path-1",
                            "creepId": "boss"
                        }
                    ],
                    "durationMs": 4000
                },
                {
                    "creeps": [
                        {
                            "type": "group",
                            "startMs": 0,
                            "intervalMs": 300,
                            "pathId": "path-1",
                            "count": 6,
                            "creepId": "basic"
                        },
                        {
                            "type": "creep",
                            "startMs": 2000,
                            "pathId": "path-1",
                            "creepId": "boss"
                        }
                    ],
                    "durationMs": 3000
                }
            ],
            "towerIds": ["gun-1"]
        }
    },
    "worlds": {
        "world-1": {
            "id": "world-1",
            "name": "The Beginning",
            "levelIds": ["level-1"]
        }
    },
    "worldIds": ["world-1"]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1jYW1wYWlnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhL3Rlc3QtY2FtcGFpZ24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFpQjtJQUN4QyxJQUFJLEVBQUUsZUFBZTtJQUNyQixNQUFNLEVBQUUsZUFBZTtJQUV2QixPQUFPLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxXQUFXO1lBQ25CLE1BQU0sRUFBRTtnQkFDTixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ1AsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUNSLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztnQkFDVCxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7Z0JBQ1QsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO2FBQ1Y7U0FDRjtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE9BQU87WUFDYixNQUFNLEVBQUUsYUFBYTtZQUNyQixPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSxFQUFFO1lBQ1gsU0FBUyxFQUFFO2dCQUNULENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDWixDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDVjtTQUNGO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUUsWUFBWTtZQUNwQixPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSxFQUFFO1lBQ1gsU0FBUyxFQUFFO2dCQUNULENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztnQkFDYixDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDVjtTQUNGO0tBQ0Y7SUFFRCxTQUFTLEVBQUU7UUFDVCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsT0FBTyxFQUFFLEdBQUc7U0FDYjtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE9BQU87WUFDYixNQUFNLEVBQUUsV0FBVztZQUNuQixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxFQUFFO1lBQ1YsV0FBVyxFQUFFLEVBQUU7WUFDZixVQUFVLEVBQUUsVUFBVTtZQUN0QixPQUFPLEVBQUUsR0FBRztZQUNaLGtCQUFrQixFQUFFLEdBQUc7U0FDeEI7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSLFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixPQUFPLEVBQUUsRUFBRTtZQUNYLFlBQVksRUFBRSxHQUFHO1lBRWpCLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUVyQixPQUFPLEVBQUU7Z0JBQ1A7b0JBQ0UsUUFBUSxFQUFFO3dCQUNSOzRCQUNFLE1BQU0sRUFBRSxPQUFPOzRCQUNmLFNBQVMsRUFBRSxDQUFDOzRCQUNaLFlBQVksRUFBRSxHQUFHOzRCQUNqQixRQUFRLEVBQUUsUUFBUTs0QkFDbEIsT0FBTyxFQUFFLENBQUM7NEJBQ1YsU0FBUyxFQUFFLE9BQU87eUJBQ25CO3dCQUNELGtEQUFrRDt3QkFDbEQ7NEJBQ0UsTUFBTSxFQUFFLE9BQU87NEJBQ2YsU0FBUyxFQUFFLElBQUk7NEJBQ2YsUUFBUSxFQUFFLFFBQVE7NEJBQ2xCLFNBQVMsRUFBRSxNQUFNO3lCQUNsQjt3QkFDRCwrQkFBK0I7d0JBQy9COzRCQUNFLE1BQU0sRUFBRSxPQUFPOzRCQUNmLFNBQVMsRUFBRSxJQUFJOzRCQUNmLFFBQVEsRUFBRSxRQUFROzRCQUNsQixTQUFTLEVBQUUsTUFBTTt5QkFDbEI7d0JBQ0QsMENBQTBDO3dCQUMxQzs0QkFDRSxNQUFNLEVBQUUsT0FBTzs0QkFDZixTQUFTLEVBQUUsSUFBSTs0QkFDZixRQUFRLEVBQUUsUUFBUTs0QkFDbEIsU0FBUyxFQUFFLE1BQU07eUJBQ2xCO3dCQUNELGlEQUFpRDt3QkFDakQ7NEJBQ0UsTUFBTSxFQUFFLE9BQU87NEJBQ2YsU0FBUyxFQUFFLElBQUk7NEJBQ2YsUUFBUSxFQUFFLFFBQVE7NEJBQ2xCLFNBQVMsRUFBRSxNQUFNO3lCQUNsQjtxQkFDRjtvQkFDRCxZQUFZLEVBQUUsSUFBSTtpQkFDbkI7Z0JBQ0Q7b0JBQ0UsUUFBUSxFQUFFO3dCQUNSOzRCQUNFLE1BQU0sRUFBRSxPQUFPOzRCQUNmLFNBQVMsRUFBRSxDQUFDOzRCQUNaLFlBQVksRUFBRSxHQUFHOzRCQUNqQixRQUFRLEVBQUUsUUFBUTs0QkFDbEIsT0FBTyxFQUFFLENBQUM7NEJBQ1YsU0FBUyxFQUFFLE9BQU87eUJBQ25CO3dCQUNEOzRCQUNFLE1BQU0sRUFBRSxPQUFPOzRCQUNmLFNBQVMsRUFBRSxJQUFJOzRCQUNmLFFBQVEsRUFBRSxRQUFROzRCQUNsQixTQUFTLEVBQUUsTUFBTTt5QkFDbEI7cUJBQ0Y7b0JBQ0QsWUFBWSxFQUFFLElBQUk7aUJBQ25CO2FBQ0Y7WUFFRCxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUM7U0FDdEI7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSLFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLGVBQWU7WUFDdkIsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3hCO0tBQ0Y7SUFFRCxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUM7Q0FDeEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbXBhaWduRGF0YSB9IGZyb20gJy4uL2VuZ2luZS9kZXNpZ24vdHlwZXMuanMnXHJcblxyXG5leHBvcnQgY29uc3QgdGVzdENhbXBhaWduOiBDYW1wYWlnbkRhdGEgPSB7XHJcbiAgXCJpZFwiOiBcImRlbW8tY2FtcGFpZ25cIixcclxuICBcIm5hbWVcIjogXCJEZW1vIENhbXBhaWduXCIsXHJcblxyXG4gIFwicGF0aHNcIjoge1xyXG4gICAgXCJwYXRoLTFcIjoge1xyXG4gICAgICBcImlkXCI6IFwicGF0aC0xXCIsXHJcbiAgICAgIFwibmFtZVwiOiBcIlRlc3QgUGF0aFwiLFxyXG4gICAgICBcInBhdGhcIjogW1xyXG4gICAgICAgIFswLCA1MF0sXHJcbiAgICAgICAgWzUwLCA1MF0sXHJcbiAgICAgICAgWzEwMCwgMjVdLFxyXG4gICAgICAgIFsxNTAsIDc1XSxcclxuICAgICAgICBbMjAwLCA3NV1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFwiY3JlZXBzXCI6IHtcclxuICAgIFwiYmFzaWNcIjoge1xyXG4gICAgICBcImlkXCI6IFwiYmFzaWNcIixcclxuICAgICAgXCJuYW1lXCI6IFwiQmFzaWMgQ3JlZXBcIixcclxuICAgICAgXCJzcGVlZFwiOiAwLjA1LFxyXG4gICAgICBcIm1heEhwXCI6IDEwLFxyXG4gICAgICBcInJld2FyZHNcIjogW1xyXG4gICAgICAgIFtcIm1vbmV5XCIsIDVdLFxyXG4gICAgICAgIFtcInhwXCIsIDFdXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICBcImJvc3NcIjoge1xyXG4gICAgICBcImlkXCI6IFwiYm9zc1wiLFxyXG4gICAgICBcIm5hbWVcIjogXCJCb3NzIENyZWVwXCIsXHJcbiAgICAgIFwic3BlZWRcIjogMC4wMixcclxuICAgICAgXCJtYXhIcFwiOiA1MCxcclxuICAgICAgXCJyZXdhcmRzXCI6IFtcclxuICAgICAgICBbXCJtb25leVwiLCAyMF0sXHJcbiAgICAgICAgW1wieHBcIiwgNV1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFwiYnVsbGV0c1wiOiB7XHJcbiAgICBcImJ1bGxldC0xXCI6IHtcclxuICAgICAgXCJpZFwiOiBcImJ1bGxldC0xXCIsXHJcbiAgICAgIFwibmFtZVwiOiBcIlN0YW5kYXJkIEJ1bGxldFwiLFxyXG4gICAgICBcImRhbWFnZVwiOiAzLFxyXG4gICAgICBcInNwZWVkXCI6IDAuNFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFwidG93ZXJzXCI6IHtcclxuICAgIFwiZ3VuLTFcIjoge1xyXG4gICAgICBcImlkXCI6IFwiZ3VuLTFcIixcclxuICAgICAgXCJuYW1lXCI6IFwiR3VuIFRvd2VyXCIsXHJcbiAgICAgIFwibmV4dElkXCI6IG51bGwsXHJcbiAgICAgIFwiY29zdFwiOiA1MCxcclxuICAgICAgXCJzZWxsUHJpY2VcIjogMzUsXHJcbiAgICAgIFwiYnVsbGV0SWRcIjogXCJidWxsZXQtMVwiLFxyXG4gICAgICBcInJhbmdlXCI6IDEwMCxcclxuICAgICAgXCJmaXJpbmdJbnRlcnZhbE1zXCI6IDgwMFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFwibGV2ZWxzXCI6IHtcclxuICAgIFwibGV2ZWwtMVwiOiB7XHJcbiAgICAgIFwiaWRcIjogXCJsZXZlbC0xXCIsXHJcbiAgICAgIFwibmFtZVwiOiBcIkZpcnN0IFRpbWUgQXJvdW5kXCIsXHJcbiAgICAgIFwibGl2ZXNcIjogMjAsXHJcbiAgICAgIFwic3RhcnRNb25leVwiOiAxMDAsXHJcblxyXG4gICAgICBcInBhdGhJZHNcIjogW1wicGF0aC0xXCJdLFxyXG5cclxuICAgICAgXCJ3YXZlc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJjcmVlcHNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZ3JvdXBcIixcclxuICAgICAgICAgICAgICBcInN0YXJ0TXNcIjogMCxcclxuICAgICAgICAgICAgICBcImludGVydmFsTXNcIjogODAwLFxyXG4gICAgICAgICAgICAgIFwicGF0aElkXCI6IFwicGF0aC0xXCIsXHJcbiAgICAgICAgICAgICAgXCJjb3VudFwiOiAzLFxyXG4gICAgICAgICAgICAgIFwiY3JlZXBJZFwiOiBcImJhc2ljXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gc3Bhd25zIHBhcnQgd2F5IHRocm91Z2ggdGhlIGdyb3VwIGFib3ZlIC0gY29vbCFcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImNyZWVwXCIsXHJcbiAgICAgICAgICAgICAgXCJzdGFydE1zXCI6IDEwMDAsXHJcbiAgICAgICAgICAgICAgXCJwYXRoSWRcIjogXCJwYXRoLTFcIixcclxuICAgICAgICAgICAgICBcImNyZWVwSWRcIjogXCJib3NzXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gdGVzdCBzcGF3bmluZyBhZnRlciB3YXZlIGVuZFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY3JlZXBcIixcclxuICAgICAgICAgICAgICBcInN0YXJ0TXNcIjogNDEwMCxcclxuICAgICAgICAgICAgICBcInBhdGhJZFwiOiBcInBhdGgtMVwiLFxyXG4gICAgICAgICAgICAgIFwiY3JlZXBJZFwiOiBcImJvc3NcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBzYW1lIHRpbWUgYXMgYSBjcmVlcCBmcm9tIHRoZSBuZXh0IHdhdmVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImNyZWVwXCIsXHJcbiAgICAgICAgICAgICAgXCJzdGFydE1zXCI6IDQ5MDAsXHJcbiAgICAgICAgICAgICAgXCJwYXRoSWRcIjogXCJwYXRoLTFcIixcclxuICAgICAgICAgICAgICBcImNyZWVwSWRcIjogXCJib3NzXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gdGVzdCBzcGF3bmluZyBhZnRlciAqbmV4dCogd2F2ZSBoYXMgYWxzbyBlbmRlZFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY3JlZXBcIixcclxuICAgICAgICAgICAgICBcInN0YXJ0TXNcIjogNzEwMCxcclxuICAgICAgICAgICAgICBcInBhdGhJZFwiOiBcInBhdGgtMVwiLFxyXG4gICAgICAgICAgICAgIFwiY3JlZXBJZFwiOiBcImJvc3NcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJkdXJhdGlvbk1zXCI6IDQwMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiY3JlZXBzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImdyb3VwXCIsXHJcbiAgICAgICAgICAgICAgXCJzdGFydE1zXCI6IDAsXHJcbiAgICAgICAgICAgICAgXCJpbnRlcnZhbE1zXCI6IDMwMCxcclxuICAgICAgICAgICAgICBcInBhdGhJZFwiOiBcInBhdGgtMVwiLFxyXG4gICAgICAgICAgICAgIFwiY291bnRcIjogNixcclxuICAgICAgICAgICAgICBcImNyZWVwSWRcIjogXCJiYXNpY1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJjcmVlcFwiLFxyXG4gICAgICAgICAgICAgIFwic3RhcnRNc1wiOiAyMDAwLFxyXG4gICAgICAgICAgICAgIFwicGF0aElkXCI6IFwicGF0aC0xXCIsXHJcbiAgICAgICAgICAgICAgXCJjcmVlcElkXCI6IFwiYm9zc1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcImR1cmF0aW9uTXNcIjogMzAwMFxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuXHJcbiAgICAgIFwidG93ZXJJZHNcIjogW1wiZ3VuLTFcIl1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBcIndvcmxkc1wiOiB7XHJcbiAgICBcIndvcmxkLTFcIjoge1xyXG4gICAgICBcImlkXCI6IFwid29ybGQtMVwiLFxyXG4gICAgICBcIm5hbWVcIjogXCJUaGUgQmVnaW5uaW5nXCIsXHJcbiAgICAgIFwibGV2ZWxJZHNcIjogW1wibGV2ZWwtMVwiXVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFwid29ybGRJZHNcIjogW1wid29ybGQtMVwiXVxyXG59XHJcbiJdfQ==