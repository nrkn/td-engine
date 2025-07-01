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
            // turns instantly, no need to define msPerTurn
            "maxHp": 10,
            "rewards": [
                ["money", 5],
                ["xp", 1]
            ]
        },
        "boss": {
            // slow turn
            "id": "boss",
            "name": "Boss Creep",
            "speed": 0.02,
            "msPerTurn": 2000,
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
                    "durationMs": 4000,
                    // test restricting sending the next wave early
                    "minDurationMs": 1250
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1jYW1wYWlnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhL3Rlc3QtY2FtcGFpZ24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFpQjtJQUN4QyxJQUFJLEVBQUUsZUFBZTtJQUNyQixNQUFNLEVBQUUsZUFBZTtJQUV2QixPQUFPLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxXQUFXO1lBQ25CLE1BQU0sRUFBRTtnQkFDTixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ1AsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUNSLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztnQkFDVCxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7Z0JBQ1QsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO2FBQ1Y7U0FDRjtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE9BQU87WUFDYixNQUFNLEVBQUUsYUFBYTtZQUNyQixPQUFPLEVBQUUsSUFBSTtZQUNiLCtDQUErQztZQUMvQyxPQUFPLEVBQUUsRUFBRTtZQUNYLFNBQVMsRUFBRTtnQkFDVCxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ1osQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ1Y7U0FDRjtRQUNELE1BQU0sRUFBRTtZQUNOLFlBQVk7WUFDWixJQUFJLEVBQUUsTUFBTTtZQUNaLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLElBQUk7WUFDakIsT0FBTyxFQUFFLEVBQUU7WUFDWCxTQUFTLEVBQUU7Z0JBQ1QsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO2dCQUNiLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUNWO1NBQ0Y7S0FDRjtJQUVELFNBQVMsRUFBRTtRQUNULFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsUUFBUSxFQUFFLENBQUM7WUFDWCxPQUFPLEVBQUUsR0FBRztTQUNiO0tBQ0Y7SUFFRCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsT0FBTztZQUNiLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLEVBQUU7WUFDVixXQUFXLEVBQUUsRUFBRTtZQUNmLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLE9BQU8sRUFBRSxHQUFHO1lBQ1osa0JBQWtCLEVBQUUsR0FBRztTQUN4QjtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1IsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLFNBQVM7WUFDZixNQUFNLEVBQUUsbUJBQW1CO1lBQzNCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsWUFBWSxFQUFFLEdBQUc7WUFFakIsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBRXJCLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSxRQUFRLEVBQUU7d0JBQ1I7NEJBQ0UsTUFBTSxFQUFFLE9BQU87NEJBQ2YsU0FBUyxFQUFFLENBQUM7NEJBQ1osWUFBWSxFQUFFLEdBQUc7NEJBQ2pCLFFBQVEsRUFBRSxRQUFROzRCQUNsQixPQUFPLEVBQUUsQ0FBQzs0QkFDVixTQUFTLEVBQUUsT0FBTzt5QkFDbkI7d0JBQ0Qsa0RBQWtEO3dCQUNsRDs0QkFDRSxNQUFNLEVBQUUsT0FBTzs0QkFDZixTQUFTLEVBQUUsSUFBSTs0QkFDZixRQUFRLEVBQUUsUUFBUTs0QkFDbEIsU0FBUyxFQUFFLE1BQU07eUJBQ2xCO3dCQUNELCtCQUErQjt3QkFDL0I7NEJBQ0UsTUFBTSxFQUFFLE9BQU87NEJBQ2YsU0FBUyxFQUFFLElBQUk7NEJBQ2YsUUFBUSxFQUFFLFFBQVE7NEJBQ2xCLFNBQVMsRUFBRSxNQUFNO3lCQUNsQjt3QkFDRCwwQ0FBMEM7d0JBQzFDOzRCQUNFLE1BQU0sRUFBRSxPQUFPOzRCQUNmLFNBQVMsRUFBRSxJQUFJOzRCQUNmLFFBQVEsRUFBRSxRQUFROzRCQUNsQixTQUFTLEVBQUUsTUFBTTt5QkFDbEI7d0JBQ0QsaURBQWlEO3dCQUNqRDs0QkFDRSxNQUFNLEVBQUUsT0FBTzs0QkFDZixTQUFTLEVBQUUsSUFBSTs0QkFDZixRQUFRLEVBQUUsUUFBUTs0QkFDbEIsU0FBUyxFQUFFLE1BQU07eUJBQ2xCO3FCQUNGO29CQUNELFlBQVksRUFBRSxJQUFJO29CQUNsQiwrQ0FBK0M7b0JBQy9DLGVBQWUsRUFBRSxJQUFJO2lCQUN0QjtnQkFDRDtvQkFDRSxRQUFRLEVBQUU7d0JBQ1I7NEJBQ0UsTUFBTSxFQUFFLE9BQU87NEJBQ2YsU0FBUyxFQUFFLENBQUM7NEJBQ1osWUFBWSxFQUFFLEdBQUc7NEJBQ2pCLFFBQVEsRUFBRSxRQUFROzRCQUNsQixPQUFPLEVBQUUsQ0FBQzs0QkFDVixTQUFTLEVBQUUsT0FBTzt5QkFDbkI7d0JBQ0Q7NEJBQ0UsTUFBTSxFQUFFLE9BQU87NEJBQ2YsU0FBUyxFQUFFLElBQUk7NEJBQ2YsUUFBUSxFQUFFLFFBQVE7NEJBQ2xCLFNBQVMsRUFBRSxNQUFNO3lCQUNsQjtxQkFDRjtvQkFDRCxZQUFZLEVBQUUsSUFBSTtpQkFDbkI7YUFDRjtZQUVELFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUN0QjtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1IsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLFNBQVM7WUFDZixNQUFNLEVBQUUsZUFBZTtZQUN2QixVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDeEI7S0FDRjtJQUVELFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQztDQUN4QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FtcGFpZ25EYXRhIH0gZnJvbSAnLi4vZW5naW5lL2Rlc2lnbi90eXBlcy5qcydcclxuXHJcbmV4cG9ydCBjb25zdCB0ZXN0Q2FtcGFpZ246IENhbXBhaWduRGF0YSA9IHtcclxuICBcImlkXCI6IFwiZGVtby1jYW1wYWlnblwiLFxyXG4gIFwibmFtZVwiOiBcIkRlbW8gQ2FtcGFpZ25cIixcclxuXHJcbiAgXCJwYXRoc1wiOiB7XHJcbiAgICBcInBhdGgtMVwiOiB7XHJcbiAgICAgIFwiaWRcIjogXCJwYXRoLTFcIixcclxuICAgICAgXCJuYW1lXCI6IFwiVGVzdCBQYXRoXCIsXHJcbiAgICAgIFwicGF0aFwiOiBbXHJcbiAgICAgICAgWzAsIDUwXSxcclxuICAgICAgICBbNTAsIDUwXSxcclxuICAgICAgICBbMTAwLCAyNV0sXHJcbiAgICAgICAgWzE1MCwgNzVdLFxyXG4gICAgICAgIFsyMDAsIDc1XVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgXCJjcmVlcHNcIjoge1xyXG4gICAgXCJiYXNpY1wiOiB7XHJcbiAgICAgIFwiaWRcIjogXCJiYXNpY1wiLFxyXG4gICAgICBcIm5hbWVcIjogXCJCYXNpYyBDcmVlcFwiLFxyXG4gICAgICBcInNwZWVkXCI6IDAuMDUsXHJcbiAgICAgIC8vIHR1cm5zIGluc3RhbnRseSwgbm8gbmVlZCB0byBkZWZpbmUgbXNQZXJUdXJuXHJcbiAgICAgIFwibWF4SHBcIjogMTAsXHJcbiAgICAgIFwicmV3YXJkc1wiOiBbXHJcbiAgICAgICAgW1wibW9uZXlcIiwgNV0sXHJcbiAgICAgICAgW1wieHBcIiwgMV1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIFwiYm9zc1wiOiB7XHJcbiAgICAgIC8vIHNsb3cgdHVyblxyXG4gICAgICBcImlkXCI6IFwiYm9zc1wiLFxyXG4gICAgICBcIm5hbWVcIjogXCJCb3NzIENyZWVwXCIsXHJcbiAgICAgIFwic3BlZWRcIjogMC4wMixcclxuICAgICAgXCJtc1BlclR1cm5cIjogMjAwMCxcclxuICAgICAgXCJtYXhIcFwiOiA1MCxcclxuICAgICAgXCJyZXdhcmRzXCI6IFtcclxuICAgICAgICBbXCJtb25leVwiLCAyMF0sXHJcbiAgICAgICAgW1wieHBcIiwgNV1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFwiYnVsbGV0c1wiOiB7XHJcbiAgICBcImJ1bGxldC0xXCI6IHtcclxuICAgICAgXCJpZFwiOiBcImJ1bGxldC0xXCIsXHJcbiAgICAgIFwibmFtZVwiOiBcIlN0YW5kYXJkIEJ1bGxldFwiLFxyXG4gICAgICBcImRhbWFnZVwiOiAzLFxyXG4gICAgICBcInNwZWVkXCI6IDAuNFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFwidG93ZXJzXCI6IHtcclxuICAgIFwiZ3VuLTFcIjoge1xyXG4gICAgICBcImlkXCI6IFwiZ3VuLTFcIixcclxuICAgICAgXCJuYW1lXCI6IFwiR3VuIFRvd2VyXCIsXHJcbiAgICAgIFwibmV4dElkXCI6IG51bGwsXHJcbiAgICAgIFwiY29zdFwiOiA1MCxcclxuICAgICAgXCJzZWxsUHJpY2VcIjogMzUsXHJcbiAgICAgIFwiYnVsbGV0SWRcIjogXCJidWxsZXQtMVwiLFxyXG4gICAgICBcInJhbmdlXCI6IDEwMCxcclxuICAgICAgXCJmaXJpbmdJbnRlcnZhbE1zXCI6IDgwMFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFwibGV2ZWxzXCI6IHtcclxuICAgIFwibGV2ZWwtMVwiOiB7XHJcbiAgICAgIFwiaWRcIjogXCJsZXZlbC0xXCIsXHJcbiAgICAgIFwibmFtZVwiOiBcIkZpcnN0IFRpbWUgQXJvdW5kXCIsXHJcbiAgICAgIFwibGl2ZXNcIjogMjAsXHJcbiAgICAgIFwic3RhcnRNb25leVwiOiAxMDAsXHJcblxyXG4gICAgICBcInBhdGhJZHNcIjogW1wicGF0aC0xXCJdLFxyXG5cclxuICAgICAgXCJ3YXZlc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJjcmVlcHNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZ3JvdXBcIixcclxuICAgICAgICAgICAgICBcInN0YXJ0TXNcIjogMCxcclxuICAgICAgICAgICAgICBcImludGVydmFsTXNcIjogODAwLFxyXG4gICAgICAgICAgICAgIFwicGF0aElkXCI6IFwicGF0aC0xXCIsXHJcbiAgICAgICAgICAgICAgXCJjb3VudFwiOiAzLFxyXG4gICAgICAgICAgICAgIFwiY3JlZXBJZFwiOiBcImJhc2ljXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gc3Bhd25zIHBhcnQgd2F5IHRocm91Z2ggdGhlIGdyb3VwIGFib3ZlIC0gY29vbCFcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImNyZWVwXCIsXHJcbiAgICAgICAgICAgICAgXCJzdGFydE1zXCI6IDEwMDAsXHJcbiAgICAgICAgICAgICAgXCJwYXRoSWRcIjogXCJwYXRoLTFcIixcclxuICAgICAgICAgICAgICBcImNyZWVwSWRcIjogXCJib3NzXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gdGVzdCBzcGF3bmluZyBhZnRlciB3YXZlIGVuZFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY3JlZXBcIixcclxuICAgICAgICAgICAgICBcInN0YXJ0TXNcIjogNDEwMCxcclxuICAgICAgICAgICAgICBcInBhdGhJZFwiOiBcInBhdGgtMVwiLFxyXG4gICAgICAgICAgICAgIFwiY3JlZXBJZFwiOiBcImJvc3NcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBzYW1lIHRpbWUgYXMgYSBjcmVlcCBmcm9tIHRoZSBuZXh0IHdhdmVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImNyZWVwXCIsXHJcbiAgICAgICAgICAgICAgXCJzdGFydE1zXCI6IDQ5MDAsXHJcbiAgICAgICAgICAgICAgXCJwYXRoSWRcIjogXCJwYXRoLTFcIixcclxuICAgICAgICAgICAgICBcImNyZWVwSWRcIjogXCJib3NzXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gdGVzdCBzcGF3bmluZyBhZnRlciAqbmV4dCogd2F2ZSBoYXMgYWxzbyBlbmRlZFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY3JlZXBcIixcclxuICAgICAgICAgICAgICBcInN0YXJ0TXNcIjogNzEwMCxcclxuICAgICAgICAgICAgICBcInBhdGhJZFwiOiBcInBhdGgtMVwiLFxyXG4gICAgICAgICAgICAgIFwiY3JlZXBJZFwiOiBcImJvc3NcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXCJkdXJhdGlvbk1zXCI6IDQwMDAsXHJcbiAgICAgICAgICAvLyB0ZXN0IHJlc3RyaWN0aW5nIHNlbmRpbmcgdGhlIG5leHQgd2F2ZSBlYXJseVxyXG4gICAgICAgICAgXCJtaW5EdXJhdGlvbk1zXCI6IDEyNTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiY3JlZXBzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImdyb3VwXCIsXHJcbiAgICAgICAgICAgICAgXCJzdGFydE1zXCI6IDAsXHJcbiAgICAgICAgICAgICAgXCJpbnRlcnZhbE1zXCI6IDMwMCxcclxuICAgICAgICAgICAgICBcInBhdGhJZFwiOiBcInBhdGgtMVwiLFxyXG4gICAgICAgICAgICAgIFwiY291bnRcIjogNixcclxuICAgICAgICAgICAgICBcImNyZWVwSWRcIjogXCJiYXNpY1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJjcmVlcFwiLFxyXG4gICAgICAgICAgICAgIFwic3RhcnRNc1wiOiAyMDAwLFxyXG4gICAgICAgICAgICAgIFwicGF0aElkXCI6IFwicGF0aC0xXCIsXHJcbiAgICAgICAgICAgICAgXCJjcmVlcElkXCI6IFwiYm9zc1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcImR1cmF0aW9uTXNcIjogMzAwMFxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuXHJcbiAgICAgIFwidG93ZXJJZHNcIjogW1wiZ3VuLTFcIl1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBcIndvcmxkc1wiOiB7XHJcbiAgICBcIndvcmxkLTFcIjoge1xyXG4gICAgICBcImlkXCI6IFwid29ybGQtMVwiLFxyXG4gICAgICBcIm5hbWVcIjogXCJUaGUgQmVnaW5uaW5nXCIsXHJcbiAgICAgIFwibGV2ZWxJZHNcIjogW1wibGV2ZWwtMVwiXVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFwid29ybGRJZHNcIjogW1wid29ybGQtMVwiXVxyXG59XHJcbiJdfQ==