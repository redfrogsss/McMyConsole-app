import ServerInfo from "../interfaces/ServerInfo";
import PlayerInfo from "../interfaces/PlayerInfo";

const sampleIcon =  `data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAlAklEQVR4XuWbd3gT17b2x713W7Ilq1vdkiy5d2OMAVNtTDO99xo6hFBC7yX0FjCQQAKhlwCh915DgADB1BiDC7ZsS\/N+SzacLwfu\/e5JvnvP\/SN\/vM9IM3s08\/72WmuvbR4YAMzfWZ+c+LvpkxN\/N31y4u8m5l2c+J8VJWHKDWGMJUPNICecQbaOQXLkJze+lwMpgOTLvi5kSnv18i1kmMZv\/Zy+KDWKF5VEyLaUGKQnSvSSGyU60eoSVWg4ifkg890WDMrDGPOj1sybdzuZEo3gjxKUhIvy6d5yUgF9vliiFe4jLSeNIkWQnEhMjTTCmt8s04trZIk2MIii926kZ9BOy7BNNUxlvJIpM8iYMpOYKY0QMyVq8b8OgI01MZYEHVMepWCKNTzGevcXm2wAUkhjCMCI8imTphfzubeKnRkUc7xQouCDAIBe\/lqJTtitWMz3fcO4MDbhXfYnAIBlTLG9W41KtAIXMlafQOSTWPqMGoW\/l1a4n9SO5PW\/AuANwzAVOi1jffsmzwo8ZaurwN64AstXc1DVtiXKpBK89XWtfisPPlpiksaVmORMsYgfSOa9\/wUAnmRSVaIX+9LRjgzuJVUSiBoIxbUAbLpHSiHZ\/bsBiAmAggB4m48d6VbEsr8VW62oplAgGLCUl6F6zVKUyUWlxU7MotJwQQwByHsb5DfgrSiIA+z8IwBXAuD8AYAFM5myBAH3TTBvUEmEZFWxXpRKEJaTiktlPLwTkWR8lKoEeKsWWoo1wnkEgEMAImwpRuZd\/qcBOLwNDx39xsEu36KQ9i\/PX\/\/VnbLyV9eKy\/Dri1f4+XUxHlhYVFRVAPNnms2cgJtl7i5nioW8x8US8QxYLpLRnY4EQE4Asp7cb9Tj6d1h7QlAFAHgEwD7iq0dnEsZ17wKAQdlMuGvJWrh78UqgZXSAhU081AKYCG901A0KIUFpH7FCooSVeguMh9tjlP8jwFwqjDJ6xab5OfeejiCDQl+Wzx3ztsLLwutx18V4eCZC1ixbS\/WHr+AO+ZqWEpeo3pkd7xzpYm2ty+xDO88lgAIKrGqaUHR4PVnLy35Nf\/QgZK9ty+8vFvx0+mn1m9mFFsX1iu\/u1ADqWdHuNmD5QfCTHoXGoKibiY8nZSEgjYGvE6Ugk0UokIXirdiYdFbqQDFilCU6SRLCYCKADj+dwGwIwA+BIBjjdflmiPUZ0r1cpR52wPGMLxYtwqnnv+OC4VvcfjcJXyxeBUGz1qCHRd\/xjOweHLuKxQ084E5U1JRdWrexWI82nEaV+9OMT\/G6NelWPoSWPIGmFhswbySp5VHrHdvFRZuP\/Rm42c3H+QY8DyDh6owD0AdiDeL0nFmTzYWDE3E3EwZLjXhwdyYh0qTiIyLqDiK8U4tN5ujVFsIQEMCwCcAXgTA\/s8CcCIAvgSAi6a6KCSbBiI+cgUbaSgwR2hQFitGpW1lHBSPlxf248zz1zjz8BlOXL2JRd9sx+QVX2PHyRs4fv8xNn03BHvninH37Oe4bnmJ3RYrPqsC4ilDssqAL8j8uN8taPnMirwiYA4LfE915GsUocvOfAyZ2BF7BjZHUT89nswxYsukBLRtrIFSw0GfVA4K+kmB\/pQSbQUozxKjPFKOqohwsDGm64iOXIn6hp5orY0iACEEwJsAOPy\/ADgQAK\/yiLAMS7pmHJqGL0Oq4SAyjGWoa4Q1SofKFuEwDw2FdRgB2NwE5lc3cev3Cuy+cBtbj57BD8dO4\/jV67jw4AXB2IeuebGY3J+P\/BP5mPewHEMvvUGr43eR+s0FxM6\/iZSZL9FkTRFaH3iOrvffYjhV0r4EoEkl4L3\/CZhpm2DYdQJfH5yNH0ebMDPBF1khrtCKvDGwmQYPJ0fAuigI7FQvWCZxUDVQhOq6arDpEUCGCUg0\/o4M\/SG2oXYFARhWFiGLJQBu\/wBQqhXXqExHAGLEhvJE8ThzYtglS3I4EEM\/kGQABhDRrlpUd9DAsioK7LchoGKN6i1t8fjXmzjx62tsPX4R6\/YdxuHLN1BUXo5rTwvRf\/ocNE6VYHRdN0zp3hi9hi9B8x5LUa9uN+gldSHlt4E0Yj409Q8guvUxZI67gtwf36Dpb1VIflkJ6YKbcO2xDsyaM0i7UoCJP6zHoJbJyOLao3uqBhunD8FP87rilwUJeLdJC+yRA0f4YEdywfaUACPpXB69f3Ik2HgjLElqmJOkh8hnBwLA+RiAqCJB\/ENVtghsOwXQQge0J80k8\/vo5qVRsKykH9tL5xb5AKN8ULi0G5bmb8LQdbuw5uBJHLl+Gz8\/ewEzzeDx27+hXf8BaJcejGm5fhjbVo+mDbIQFBIFe+rA3Un+1A4EB\/qDx0sm9YWEvxAREbuR1v8MUpdeh2L0WXAbj4Rfpx7wm7cXaTctaLJqK5plRaJH567oNmsXmo3ZgJEz1uDokY14cWMWih\/moWJvFKxraQKP0\/se0gMT6J3bGcB21MDaSYbKLFHxu0jRaALg+wGAa7lJsrk6W1yFwURujhrYQDftph95EA+8aQrcSyfC9H2BBBXTNSje3AqXD8xB\/ylzYGw3Cn1nrcXe87dx9d5znL5RgCkrdyO1QS6lIB95CUJkpxlQv14GhBINnJ29wOUrwRNqEODrjUBPBnyRD4Tq+ggIGAwPpieCXbMhaTACAfoc+MuM8Famwa3uaLi1nIyADmMR3ns64trMhDRlPMRtN6HV2mdYdh04cLsMp67tx8XTn+Pu\/dZ48zIZ1iu2iSMQG+j9p1OU9KAaliF+UqoT5zHoFM6U6iVNKzOlt9BHamUnK8FupcGnKYfOxoB9lk21vAt1OGmovpyIgn0DsfvAGvResRlpg1ciKXs8VNFtIDI0R0RqN8Sk9YJE3waBgkwEBCfDh5MIF+9o+PHqIKZeVyRltEBIsBRBHBHNuhyhQi1CQ9Xg+AfDJ4ADb3EUQhRJMCjEqGsSoG6SCfFRcTCq9JD4BYLnK0CQNAH+8hT4hUbChxcFL04kOLJGqNNpDQZufIFR+83ImHIPdYdvwoadfVD6OBn4hfwcJF9LNdS4h8HSXoqKJOlGGwC7ikRZVlWu5ApGyyzsLCog85TAesqf63WByjxq7VqgsnQo9p9agMQec2EXNAQO9o3g5hsBnjgceoMOcTFyJMQHU377o02LAAzrx8PCGWHYsCocyxfr0LWbASGiGDh4pkEQlgxZWDiEPBlEAgWEIi08OVFwD0lGbvNYnNpgwttTiSg9nYDCYwl48mMC7u1OwK0dCbiyNQGnvo7FwSXR2LYwGt\/Oj8H8MRHISuHD3dGPQGSh3+TlSOqwG5z0TZjywwS8MTcDzpH5hTS5M8jfdAUs\/STmymaypQzbTsu3tFI6WweJt7FTwirYARKwrYLBLiVir1oBbGNYH9fB0qnDECToCwfnaDRtKMba+SIc3y7EtcMCPD7Px5s7XJT+FoTS3wPwrsQfFe\/8UVkZgKqqAFgs\/qiqDMTZIwI0yzTB3qsBeBEtoI9NpbyXwcvPQLNaFxOHJNGuIh4WM6XdbwnA\/QSwD0i\/kh4lwvokEZYCOj5LRPXzRFS9IBUmorIoAVVPCczGKEQp5LD3qYOOue1xaH4rvLzREha0A67VAztKDrazgNZeMdgvRTctfWXNmOos1SRrT8VFzJBUYQafuhIadCIZ7O8087bQN9fFtXwjDKGJEHHisGyhBC9e+cNs9kN1aQDYt0FAIbX3L0jPOJQyXHrJ96LP1XTOUkDXCoNgrfTH2eOByEpXwUXZFynT9iC29zR4eBvQNUeNN49SgXIyfpF0hXSZdJV07f3xamLt5xvvdfP98TrpF7pmTsQvZ+IQqY5EuMSAfV+pYX0UCVS0AGvpDvZFLtU16rhnCykK+Cw7WlbMVNYPU1IorKxqL\/m+uhn\/oXWs1ML+kkE535UAtIGVHtIpJQ5cv1jMmStBcXEg\/SAH1lccmgVSQTAsjylinpDJV3StlGS1KQiWl1yU\/8xD+S\/UzT0MBoqCUF7shw3L\/aA0pkPYOh+KLisQHROLrXNpZioIwHWa\/TOkc+914f2R0gGn3uvD9QsJtTpPukS6TRCsSchfEwtuWDw6NKDWeSeFflFD8tIdKGsJ68YI2q2GPqtqLtxpbiFbZANgV1FfKjdnSbXmerLoyjTB6upJijI8y6Kb2uH4N5ng+CSjS8dwPH1Gs11Gxm6FovpqKCpu8VH5iHqCcjIMf6CarheFoPwJH0UPqDO7HwrLAzL\/Kw8V93mofsSj+wNx+bIfcloYYcfpDh9pF7RuFYvrB6lCv6YU+Ok9gA86GUfFmPSQPr8g\/f7+eJt06v2YD7BOEoRn8WBfkvl2yQgXR7O75sZZ2dIWNZPJ7o5HVRvReXOCKM9cRxpWUU8qsAFgCIC9uSEpM8y+PFISVVWHuwffayusyMXUpXkICk3G4mUCVFaQyV\/4sOyVwXJABtyi2X3Mw9UzYmxaK8S8SWKMGaJD+zaJGNQ1Gud2UJtaTNHxgqDcIQgPCFZJIB4+DEKvHgYwDg3g5paObm2j8ehkNL08GT1COvVeNvOnY2Ghz08Ox+P+T3H49VgcXpDpyvNklMIdH3TaBoBE51Eej5mTYiAVx7ybPK3xmzeVbapwj5bDQaJnZiNvSEWM2KuijtSuIkNq\/wEAQwAYAsBUpKvsq9JCh2A271n5k2QMmt0GEl0yNlL3ZyklAFcoVDfTKpFPvcINAQpv8zDpcz3C1KnwDYyFt78Gjo6RUIqTsWkJhZ+Z6srrEJgJlsWWBmUBKKB0GTrYADuX+nBxSkPX3Eg8OEQAfqOXPxJLDcwfdCkW1cdiMbZnLHIzYtGyXiy6NovDznlxeEfXcJ50IrbWvA0YAcLrWKycEw2lMsH82YRGxc+eZlZjn5KaIP7JqgayZALAEACGADD\/BKA6V2OTszVXNBcLuW+q70dg4oJGEIanYA3NcPVLCvXTtB9fRwCW0Hp6RoZX50MwuJsCLiEt4aIaAH9lYzCMDqHcSGxYYqRVhICBS7WBakSVLVV8alaJ2V\/qCEAmXBxT0KmJEXdtfw6whfmPMZQGNsXW6mIMqo9Go35yNFxdYuDqGAMv9xhMGhCD19do3DnqVY6SCBJ7lMYfo3PPY7B6fiz0ijh21MhUy4ua35WBHRr6s6WdPMfaUsVYGqtrAVQ30jCWrHCGbaGpVVtFR\/Tg3cEWsRWlcchfVgfB0iTMnSqH+TrN5h4K\/RVkfgHpkAKll3mYOSwUfFUWeA2mw9RtHvx1ncHhxmHWOA1Kn0lgLhTi+S3SbQGe3QvFtfNijBoaBY+gevBwpSKbEY7bW2jfcY9mb19MLQSbDpHOxMByOBqdskzgcUy0DJvg7xeJWQOj8PY8XafUYQ+SaCz7IwE4TOceRWPVvFgYRVEY3zMOr56m1TZCM0It6CjeQQCMNgA2fQygKTpJLmCasBq36YXKUnBqTgz4wgSMGKBD8UHK6a3KGgDsIgJwQA7LXT7WzRJAqk6AX8wQJA9ai8gOMyDU1EXDBDHG99dhxKAYtG8XiTato9EsOwb16sfCFJcIXlgagv1N6JCgxu18alfvEIDdZGbfe+2ntDgeDQulx5BmEZDwtGCcNOAF6LFkSBRKbOFP13GAdJAA7Cfztnt+jsbqOfQMqQkTmhgoSqm4ltAKs5\/SdoSwkm0rX0Xmef8EwJJBALLDFmGstAxnKRzL6lGRS8DDcQaoQ+LRsbUJT7bSJmkLaTWtrytUFG4EpICH7StDodXFwE3TG1Hd5iOt55cIT2xCLa8Ofn5xrFdQHTj7J8HZOxGOHglw9I6HBy8OvrxI8LyU6Bwtw521NENXKVR\/oN0mpQO7i3Zwu+g9DtEmbH8URjfRQhqkoPSSg++lwuphRpTbVoIrBO0EGT9OOvo+fR7FYB11ibFKEyYmaPBqDaXiS+pqC2k\/s502d30kN60NFQ0sdcNrAMgIAJcABFgb8DdhhfIdimjgy0zgexPKOiuQ4hONzHrRuJxPprcRgHUqWNYrwJ4T1RS4Y9\/wEBcbRc1ND4S3nYHEnjNhaDESophW8OMnVfkExxV7CZLKXYMT4MqNgTc\/DgHSRATwoyBwFaOLPhS3llIEXCRD35P578n8d6Rt1MTQzs5CIMY3kEPlL4GrnRQSTxkWdg5H2S5Kj91UJAka9tgiIaa2iFIx\/WZlDJKUOnwpV6BwKM38SYoCM\/UD16hWDBb\/akmTdCcAYqa6gSa3up4u39JI+xWbyrmIL4VmUPWvov4bjUPAGgPRWR4NTXISts\/XwrqNdlOblLBsJgBnxbRTDMaVA3ykp0SB8W8DN+MA+KQMgktCf9jHtgcjTzUzITGFTGhSGSOOByOOgTNteNSRdZGW0RrJshh0kAXgwlSqLeeokfmWjH9rAvtN7REUDdbtkZicIYTaKxQiTyESAkLRThGKEYlSjEkPw\/hMOaY0UWJuaxW+6qTBzlHh6Nlaj1iNBssC+SiT0er1BW2Ff6YOdzelb0fua0sD6UlLln4PU52hbVitVRVauxneYX74OxzQWqv2GPAyhwfW3g7IDET3ppTfkalY9bkO1dsJwHbaTGyllvk4ASji4pfzAmQ1IQAudeEWnAqZPhHq6GRERyYjTRlnbRQWZW6niqzuLzeipUCP4GAt3FXUsqY0RbqUCpzIFxc+p234CQKwkcxvMJLoSC04tkbC+p0Js9L50LlxofbhoWFQIBp4+iDOwR9xTgFIcA1EolsQkj2CkOrNQTM\/LgTuXIilUqxKEqOC54EKmSeKv5DC+pOOxY96i3VKRHVVuqbSBiCwSqA8am1NoX0nhXZ+uahYFY1iNxdA44kbE2TIahwFJxE1Q8MMqNodRmEZRpFAzdAhemnq8AqpN\/huugZT8nRY1l+F7yYpsLuXHEcSFTiTrsHVwVrcG6\/B874q\/NxMhdk6JZTBCjgHqaF0F6CXyB+XxxHYQ5TPX0eAXW2o1TpKi01GWCgS5tcJQYyLHwSeAiiDRND78xHuxYPOkwe9ZzAMHlwY3DjQOHGgc+Yg0tUPcUIOvuinxoP2tIQ72aOiAXWjDxvTUtwc7AryopK+tAFgKhWqrCpd2GHWlofP68FqW05yBbjfR4LVI8KQkxYOV0ESJg40oXQHAdhPJHdJYdknpSZFROu0GOXbpCj7Ro4KqhFVCxWobiWHtX4Y2DFk7FtaObZR\/fiGjqvUeNVThRlSCfwcOPBnvNFD4I8rtFPDHsrhVTT7yww1L8ja\/gK13kD9uxGLUjlIdfKCj2cY7EMi4cSLgAsVWVeujqIuHJ5cLby5GngEknw0iAxTomuqFGP7KbF1iIIiOpSWQdoK\/5wG9kgCqtsrX1UqFCOZSq3aJmdzqDK9KiJsGabLT+K04eWjTUbLhv5hWNg6FAMaqOHKr4OBPaNQtIcq\/3Yp2OUKWJeRVhGQlZS\/a+iYT1E0mwpOHqmZFphA2kSfv7YZtwGgz3vUNcvoqYYyJDj5w4NxRZsQX1waakstKmbLKQIW68EuMdQIFAnW9UYsSaPwdvZAkIcY3sF6BISEw5+ngzfJi6+HB98AN34EvacRDv5GOkaiXqoOY3KkmNNKjAOzdCg5ZizHBtVNaxPxd2ZZWA+zPtz3AwDGLFA5Wn3EHORqcwq\/izy6c4G2clknGVZ3kKB3fSHsHE3QxsThynpa\/\/eR0VV0XEQGF5OxZaR19P0r2tAM1wG09mOx7U9q1ApvpDGzCMAMVe1YAsJ+p8W1vnI0ozz2YBzRlOuN830J4Gaq+ksIwDwCML9WoKi0rrYB4CLO1YdSJgTxAcFI9A6EziOQ0oBC35YCPiHQ+\/Fh8BcgIkCIEBcqmlwh+qeKsTBXinUE+MLWiKKq2aZpkEplVf4SVwLA\/BEAQwCYV11j4s\/Njrr+Q38Fu6WnGl+2ltJ66gZhoBROwSnolq3H1cUCmLcKwG6UomKFEq+XqvF0vgq\/jlTiTvcwXBomwY9fCrBnrAC3x1KtmKmu\/TujDcISArA5HDcp5NsEesGLsUcWxxvnehKA9VT1F9HMzyLzNGM2YSEBWG7E0lQuYiivDe5BVOR8kOXkjCjGCUZSZI2cSS41irIjMbbr7sgz8rG4iwpbO8txcJKevTcnbsbz7gYHAsB8AuDsQL1NMSc+Cz9zfKAWa3uFI8NEBUXkhgVdtVQLUuHurkKS1gsT8xis7OmKpV14mJorxnCq0r1NQWin9UVTlSsihQ4whjpjTqMQlM2lKPiKRMURc1Rg12hxe4ICncU2AHbICPDG6c4EgGYacwnANDI\/PbxGmEMAvjJiOUVAvLsvFC6BSPfyRVeeF4ao\/NFP6ks1xAedQ7yRx\/FCS38PZPu4I4eKeCqBSKMldnhbObb00eLoQN2bn77Qjzw8Xe9CYmxiTg5QfCzfn\/qoW23ro7vYK0tSHa7wZ6dT01G6Lhq7x8QjITkXgcpsqDUJMKk0UPJCIfUKRJizP6TOvpBSmMocfeHJeMKJZqa\/0Revp6pr02McmZysqIFxb5oCvQw+NRGQ7OuJ43lUR5YRgNkEYDKZ\/7JWmK6HdYERKwlAoqcfgu0DYXLyxdykYFwdo8GtEWpc6afAhR5ynOoiw7H2UpzuGoblCTy0DPC2Rov9qrLSQzG9s+bF\/n7hsw+MUMt3TtbYkRibPjZfoyN9NU4Ts+UtDHL\/DU3rCDbf3NrkdtmGcOujVXHYun09hq26ik5fHIKp8Xg4etG+nsy6Mz4QOAchMlCM9DATdIIIcB380DvMFU9Hk7l5ZGYUARhHAOaG49F0FQbH+MGbAMR6u+NILi2piwjADAIwnsxPqBUIgnVuBNbU4SKFAHCZQBjsfbA+kw\/zUhq\/1FQTNZgTUQMPNBZfxxAEBfqJAl4lCH0PRhg5G3pnyz\/7rq9WSgBqjP9XAJgh9SXOQo6ntndLubLoUosW1xbrdvw0La54x57VmPbtOfSevB2mBgPg4BFGABzhSLkXSstUMoeHHK0BKVIDJA6+6MR3xr0BZG4m5fMwqvS25W6mFgVfqDHG4AdfSgGTlzt+bEpjZpOhqQRgDJkfWysQBAtBWZnGQ7qnN2S0bEbae2FlSghKaUuNabZ\/+KBxk3S1sn1fGYXT3eXoFex\/N8rTvZ9aHSjvki33JgDMnwHAEACGADAEgFk1JiGmSbT2SKPMNDbRlAIDrbl6zyAk+bmhZagH8kQeSPNxQrSzM3VjPjB5+kJAUNoEe+BWNzI3hV5yqKIWwFQNXg5QUZ8egACKAL2HO\/Zn0ZhpNIOTqQCO0IIdVSuMIwDTIjCfQjrayR18SislLZ2zooNRNNqWVlQvhmtrNYzGUxsMGm9LqfYBPr\/oGeeWBsaJIQDM\/y8AhmFCFwjtnKtyvRkMEzJYZHLCoSaBuN9Phl96SzA5whsKOztwKCKCHZ3hRy+bE+iBq3ni2p5g2HsAIzUobKvGLGkQghkHhHu4YXd9cY15TCAAn703NLzWEPtlBBYRgChndxrvCDFV+KnGYLweRTM+Vlc7fihpiO0ZtmiIwLFWUuRxfR\/E2Lt2IQCuNggf9KcBMHa8D5qQ5uNdfqR+MAqpQ6ywFTRqgbGS8m6mHusSQxBq71iTEvaObjVHo6cNEq8WwGgaP4AAdNSiOEdLSzwXQkcHKFxdsK2ukF6cImA8ARhUa6bG0GcEYIwOR3MIsCkYA8IC0F8SWDO+7DNb30HXqdWuuYeEIba0MeA4rf3tQ\/zuJTh5dE1y8nQnMf+RPjH\/MQDGMfiPGpDK4RSeb0CNzSAqPrYZGENr+0R6+AAd1kXwwbdzIOMMPOnoSvkt9XDA9w2CyRyBoj7B2pruzQ5HRXctNtQLhsjNHjxHR6yM5aP6cwIwgRqh3tQrDLD9JhkaQLs3UhmZfEkGn1Bv\/6iXGq9pjLU\/\/SaJ7Udj3x9ByzfGG3CCOsB2XN+b8c6eLRJdPR1JzH+kT8z\/EQBj5\/+xWou8fO6uiaZGqCE9vJEK1uY0oy1pbW+txY\/pIrTie6KOuyt6BHnRGu2DMZH+uNheRLBobFcVLFkEoLsG78arsaYRF1xne3jYOWG4lINfqfHClMhaADb10dSqFz1rCMEeTSligzSONJS+96q99o9xPej+wba6EIGdmSI09fE+Fu\/kGfux6X8C4Mr4\/xml+Xt6npyVzmVLc+lhDbWwNqJZbUEAeirx+yAZrrQQ41KsDA\/rK\/CCNiJFY5WoHKGgPbiiZixLTQkmavBqohJjon3hQjXAxd4bmd5+WB\/LhXU0pdNoWg1628xpaw3aAPR4r57\/98j2+EjdKRrHmvCmXzgmaLi01\/BYEefsEUJi\/jMxcuegPyOem4PHpg5GH8uDtrS2dyLatLNjB9KubyR9H0M53p1mpjmZ6EazNY2uz6WXHUqzSdtg5JDGqGt6gmM9hIj3c4Iz1QmpF21h3QOR4+6GfbS8VY8gAJ\/R\/QNIfXW16k2\/1YeOfejYy\/Zcba26v1dP2yqjh4XuzU8Rob6n961YJ8\/sZFcPRxLzn+ljg\/+l\/Ox8Bgg8XQqXZHHwbgqZmU0PH0Nh3ZfUhszWp++ZdGxNov0\/hpL6amsNUK2oXqHFzXESdNZ70CrBwOjkiIYcDhRBMnjZhyCaiujXxgD82laJcjJm7qImaVBNrXhVZ9pqd6OtNgGw9rb9ba8WCvteZX312FdXQq2w75MoB4\/+GR5eXh8b\/liMxDngz0riyLhujhC5VK0bGoTXK+SwzLIVJFJLSonmZLKlGhVUF4pbK\/C8M6VDLyHuDufhylQOtn7mj3ZRzgi0mXdxQ3P\/IBi9RfDlRCJIkwx5mBAqiorufv7UMQdjrTYI67SB+D6Sj52RXOyICrBujw6s3pfAtZzMFLAXm4XhYrYcR+tL2a\/CQ6rru3tdCbd375bo5ulNAD4x\/LE+NvcvSebgGenBOH8fFuxUNjTHE\/kDA7G7DxcHOvCwuxkPW+qFYFkyB5OMXhiqcUJvnR06RzHIVjNQuTjWhL2EdnMpwXwoBEb48OMRn5iO6RNy8d2SVujWJAIif0+IaFw8AUrjBiApIAjZxtTfWigjtmXYuS1NY5hNWc4Ox9oGeF3uEOR\/obGX914Z47pK6+CeRgAYAsD8TwJgVE6eKoaxn0VL3lGxp\/3TVIkTmyR2go7rDDG9vJ+vF5w9vOHjGQq+nxL8ICOkwnrQ69ogytQEYTIT3PzDwJWoMah7HVzd0QGWW31QeqEj9q5MRvccDmIU\/hjeqS7mDGuA7HQV2vX9LL9Tq46hPxzbx3Ro1co7whQXw2GYJhLGoUGko6eUADAEgPl3ASDv9kzXDJF+XEPV1n6JckuqMBhSH1\/waZ+vVgZXNW2Z\/az32EWPe4xcXdF1yBL0of3DiJVnMWTFKdTrvRg8fXNkJquxb34Eis80wb19OfhhZgSmDJBh6JA2bJ9BA0q2LuhccSK\/J8Z0jkCDOMm3DQxBqQQg6bylMvbzS9ftlwAMAWAIAPOXABR8nfGXZd7WkMHtPCW7N+e7wxPqWIc31qGukovkUAajs4Kfnt4+Z8qpAnPvVade75q6\/OCLUbO2mEcv2ImJ+Rfw+cbr6DN3P\/qNn4dJX3TDlP46jGoThJG9U9jB46YUfbnx2sVFu+6vzJ\/R8egPs3IqJ\/eMRTyXKc1Q+D2eP2Pyy+3PCs8uAGIIQA2E\/y0AXtU7G418sKr+s+V9o9AxVYo6FLatDV7srsGGw7\/tnqwgAMzeIui3nP5t0IKNJ3YPn7T2ce9RS4v6Td7Ejll3DktOFuL7G4+w8psN1ZMmjHmxcMOea\/kXqxd9exfJOy++5k7qbOo+pVtU0Yg2RiSLnFAniEHvVi0x+OuD1UPO3Bsx5lmxH4n5oH8nALuCdRmNLs9Lub6omwGto4WI4fsgReyD8S3CX15f2mp0+ZY8b5INAEMAmK2nCuTz1h9vOXXVobmDJuff6TtpU8mmswUlr4AXFcCpOy+rRh94gDq7HyGQADDmyipm\/vCWHTskBhblmLxQX+SC7slydBk4FtmL97Bdtxxf3XPrT3wS87H+ZQCP1mX8VTkfn5YwenxzeVGOMQRpMj9Eh7ihbTTPunVU5u5H69pqbeY\/AsAQAGbZzutu6w\/fb7Nix8WFh64\/X1vw1joMQNxrs8WeADAEoMY8KWTnvn0nO2VqqtqmCNCjYRJGfTEZvVb\/iPabT+CzHy\/sG330kozE\/FUx5+bE\/VU5z+ui7BPF83gU6uoImZcDooJdMLFl+JPry9r0f7mpvQuJsek\/AMAQAObyqyq7gioEEICa\/4NEAJh\/AKi22CRaee7e20EjJ7IDh3+OvOELkDluM3qsPIQphy5g0pmbP004c0tOYv6qPjb1p7Sgq4JfR+49S+Xv8jLYiWHVfk7Wxb1iNxVs7ir7YP6\/AMAQAOZjAGVk\/r1cR569M7rF\/IP3Uwd\/UyXInsvy649G7vCvMGnvGUy5dm\/npBsPJCTmr+oTU39GBIDJVHkF6IIcR0k9mBtid+b0qObadmfm5jiTmD\/qLwJgCADTdsfJ\/mmfrzraYOC8x3G548oNzcYgb\/E268wHBQsXvSoKJjF\/VZ+Y+jN6D4AhAAwBYAgAQwD+yfh\/EwBm0t3fPKbeftylx9p9PzUev7q088ZDd6Y+fNZi7qs3biTmr+oTU39G\/2YAzJxnhV7jz\/\/cvO\/24xuG\/nR51pf3n8g+NvRnVfPgv7M+OfF30ycn\/m76PxUQ0GxCzqyGAAAAAElFTkSuQmCC`;

const serverList: ServerInfo[] = [
    {
        id: 0,
        name: 'Server Name',
        status: 'Online',
        activePlayers: '10',
        totalPlayers: '100',
        version: '1.17.1',
        ip: "mc.redfrogss.dev",
        port: "25565",
        icon: sampleIcon,
    },
    {
        id: 1,
        name: 'Server Name',
        status: 'Online',
        activePlayers: '10',
        totalPlayers: '100',
        version: '1.17.1',
        ip: "mc.redfrogss.dev",
        port: "25565",
        icon: sampleIcon,
    },
    {
        id: 2,
        name: 'Server Name',
        status: 'Online',
        activePlayers: '10',
        totalPlayers: '100',
        version: '1.17.1',
        ip: "mc.redfrogss.dev",
        port: "25565",
        icon: sampleIcon,
    },
    {
        id: 3,
        name: 'Server Name',
        status: 'Online',
        activePlayers: '10',
        totalPlayers: '100', version: '1.17.1',
        ip: "mc.redfrogss.dev",
        port: "25565",
        icon: sampleIcon,
    },
    {
        id: 4,
        name: 'Server Name',
        status: 'Online',
        activePlayers: '10',
        totalPlayers: '100',
        version: '1.17.1',
        ip: "mc.redfrogss.dev",
        port: "25565",
        icon: sampleIcon,
    },
    {
        id: 5,
        name: 'Server Name',
        status: 'Online',
        activePlayers: '10',
        totalPlayers: '100',
        version: '1.17.1',
        ip: "mc.redfrogss.dev",
        port: "25565",
        icon: sampleIcon,
    },
    {
        id: 6,
        name: 'Server Name',
        status: 'Online',
        activePlayers: '10',
        totalPlayers: '100',
        version: '1.17.1',
        ip: "mc.redfrogss.dev",
        port: "25565",
        icon: sampleIcon,
    },
    {
        id: 7,
        name: 'Server Name',
        status: 'Online',
        activePlayers: '10',
        totalPlayers: '100',
        version: '1.17.1',
        ip: "mc.redfrogss.dev",
        port: "25565",
        icon: sampleIcon,
    },
]

const playerList: PlayerInfo[] = [
    {
        id: 1,
        name: "Player 1",
        icon: sampleIcon,
    },
    {
        id: 2,
        name: "Player 2",
        icon: sampleIcon,
    },
    {
        id: 3,
        name: "Player 3",
        icon: sampleIcon,
    },
    {
        id: 4,
        name: "Player 4",
        icon: sampleIcon,
    },
]

export { serverList, playerList, sampleIcon };