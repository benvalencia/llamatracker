import {Client, ClientConfig, Language} from "fnapicom";
import {
  AESKeysRequestParams,
  AESKeysResponseData,
  BannersRequestParams,
  BannersResponseData,
  BRMapRequestParams,
  BRMapResponseData,
  BRNewsRequestParams,
  BRNewsResponseData,
  BRShopCombinedRequestParams,
  BRShopCombinedResponseData,
  BRShopRequestParams,
  BRShopResponseData,
  BRStatsByAccountIDResponseData,
  CosmeticsByIDRequestParams,
  CosmeticsByIDResponseData,
  CosmeticsListRequestParams,
  CosmeticsListResponseData,
  CosmeticsSearchAllRequestParams,
  CosmeticsSearchAllResponseData,
  CosmeticsSearchByIDsRequestParams,
  CosmeticsSearchByIDsResponseData,
  CosmeticsSearchRequestParams,
  CosmeticsSearchResponseData,
  CreativeNewsRequestParams,
  CreativeNewsResponseData,
  CreatorCodeRequestParams,
  CreatorCodeResponseData,
  NewCosmeticsRequestParams,
  NewCosmeticsResponseData,
  NewsRequestParams,
  NewsResponseData,
  PlaylistByIDRequestParams,
  PlaylistByIDResponseData,
  PlaylistsRequestParams,
  PlaylistsResponseData,
  STWNewsRequestParams,
  STWNewsResponseData
} from "fnapicom/dist/src/http/autogeneratedEndpointStructs";
import {ClientOptions} from "fnapicom/dist/resources/structs";
import {IFortniteApiConfig, IUserProfile} from "@/app/services/fortnite/fortnite.interface";

const FortniteAPI: any = require('./../../../node_modules/fortnite-api-io')

export class FortniteService {

  private fortniteClient = new Client(this.ApiConfig(true) as ClientConfig)
  private fortniteApiIOClient = new FortniteAPI(this.ApiConfig(true, true) as ClientConfig)

  /**
   * Returns an array of all items of today
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getDailyShop(options?: BannersRequestParams): Promise<any> {
    let response: any;

    await this.fortniteApiIOClient.v2.getDailyShop()
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all Points of interest
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getCurrentPOI(options?: BannersRequestParams): Promise<any> {
    let response: any;

    await this.fortniteApiIOClient.v2.listCurrentPOI(options)
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all items
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getAllLootList(options?: BannersRequestParams): Promise<any> {
    let response: any;

    await this.fortniteApiIOClient.listLoot(options)
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getChallengesList(season = "current", options?: BannersRequestParams): Promise<any> {
    let response: any;

    await this.fortniteApiIOClient.v2.listChallenges(season)
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getBattlepassRewards(season = "current", options?: BannersRequestParams): Promise<any> {
    let response: any;

    await this.fortniteApiIOClient.v2.getBattlepassRewards(season)
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async searchAccountId(username: string, options?: BannersRequestParams): Promise<any> {
    let response: any;

    await this.fortniteApiIOClient.searchAccountId(username)
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getAccountIdByUsername(username: string, options = {strict: true, platform: ""}): Promise<any> {
    let response: any;

    await this.fortniteApiIOClient.getAccountIdByUsername(username, options)
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getUserById(id: string): Promise<any> {
    let response: any;

    await this.fortniteApiIOClient.getUserById(id)
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }


  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getGlobalPlayerStats(accountId: string, options?: BannersRequestParams): Promise<any> {
    let response: any;

    await this.fortniteApiIOClient.getGlobalPlayerStats(accountId)
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getNewsV2(options?: BannersRequestParams): Promise<any> {
    let response: any;
    await this.fortniteApiIOClient.getNews()
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getTournaments(options?: BannersRequestParams): Promise<any> {
    let response: any;
    await this.fortniteApiIOClient.getTournaments()
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getTournamentSessionDetails(windowId: string, options?: BannersRequestParams): Promise<any> {
    let response: any;
    await this.fortniteApiIOClient.getTournamentSessionDetails(windowId)
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getTournamentScores(eventId: string, options?: BannersRequestParams): Promise<any> {
    let response: any;
    await this.fortniteApiIOClient.getTournamentScores(eventId)
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async listPreviousMaps(options?: BannersRequestParams): Promise<any> {
    let response: any;
    await this.fortniteApiIOClient.listPreviousMaps()
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   * @param options Options for this endpoint
   */
  public async getRarities(options?: BannersRequestParams): Promise<any> {
    let response: any;
    await this.fortniteApiIOClient.getRarities()
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all challenges
   * This endpoint is FortniteApiIo
   */
  public async getMapsItems(): Promise<any> {
    let response: any;
    // 'e02ac7cd49c24631bfe5aba8571b8d8f'
    await this.fortniteApiIOClient.v2.getMapsItems()
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }


  /**
   * Returns an array of an item detail
   * This endpoint is FortniteApiIo
   * @param id id for this endpoint
   */
  public async getItemDetails(id: string): Promise<any> {
    let response: any;

    await this.fortniteApiIOClient.getItemDetails(id)
      .then((res: any) => {
        response = res
      })
      .catch((err: any) => {
        console.log('err', err)
      })

    return response
  }





  /**
   * Returns stats of the requested player account
   * Note: trios stats will always be null
   * @param username username for this endpoint
   */
  public async getProfileByUsername(username: string): Promise<IUserProfile> {
    let response: any;

    await fetch(`https://fortnite-api.com/v2/stats/br/v2?name=${encodeURIComponent(username)}`, this.ApiConfig(false) as RequestInit)
      .then((res: any) => res.json())
      .then((responseJson: BRStatsByAccountIDResponseData) => {
        response = responseJson.data
      })
      .catch((err) => {
        console.log('err', err)
      });

    return response;
  }

  /**
   * Returns stats of the requested player account
   * Note: trios stats will always be null
   * @param id id for this endpoint
   */
  public async getProfileById(id: string): Promise<BRStatsByAccountIDResponseData> {
    let response: any;

    await fetch(`https://fortnite-api.com/v2/stats/br/v2/${encodeURIComponent(id)}`, this.ApiConfig() as RequestInit)
      .then((res: any) => res.json())
      .then((responseJson) => {
        response = responseJson
      })
      .catch((err) => {
        console.log('err', err)
      });

    return response;
  }

  /**
   * Returns the current aes keys
   * @param options Options for this endpoint
   */
  public async getAesKeys(options?: AESKeysRequestParams): Promise<AESKeysResponseData> {
    let response: any;

    await this.fortniteClient.aesKeys(options)
      .then((res) => {
        response = res
      })
      .catch((err) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all banners
   * @param options Options for this endpoint
   */
  public async getBanners(options?: BannersRequestParams): Promise<BannersResponseData> {
    let response: any;

    await this.fortniteClient.banners(options)
      .then((res) => {
        response = res
      })
      .catch((err) => {
        console.log('err', err)
      })

    return response
  }

  // NO SENSE
  // /**
  //  * Returns an array of all banner colors
  //  * @param options Options for this endpoint
  //  */
  // public async getBannerColors(options?: BannerColorsRequestParams): Promise<BannerColorsResponseData> {
  //   let response: any;
  //
  //   await this.fortniteClient.bannerColors(options)
  //     .then((res) => {
  //       response = res
  //     })
  //     .catch((err) => {
  //       console.log('err', err)
  //     })
  //
  //   return response
  // }

  /**
   * Returns an array of all battle royale cosmetics
   * @param options Options for this endpoint
   */
  public async getCosmeticsList(options?: CosmeticsListRequestParams): Promise<CosmeticsListResponseData> {
    let response: any;

    await this.fortniteClient.cosmeticsList(options)
      .then((res) => {
        response = res
      })
      .catch((err) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data of the latest added battle royale cosmetics
   * @param options Options for this endpoint
   */
  public async getNewCosmetics(options?: NewCosmeticsRequestParams): Promise<NewCosmeticsResponseData> {
    let response: any;

    await this.fortniteClient.newCosmetics(options)
      .then((res) => {
        response = res
      })
      .catch((err) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data of the requested battle royale cosmetic ID
   * @param options Options for this endpoint
   */
  public async getCosmeticsById(options: {
    id: string;
  } & CosmeticsByIDRequestParams): Promise<CosmeticsByIDResponseData> {
    let response: any;

    await this.fortniteClient.cosmeticsByID(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data of the first battle royale cosmetic which matches the search options(s)
   * @param options Options for this endpoint
   */
  public async getCosmeticsSearch(options?: CosmeticsSearchRequestParams): Promise<CosmeticsSearchResponseData> {
    let response: any;

    await this.fortniteClient.cosmeticsSearch(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all battle royale cosmetics which match the search options(s)
   * @param options Options for this endpoint
   */
  public async getCosmeticsSearchAll(options?: CosmeticsSearchAllRequestParams): Promise<CosmeticsSearchAllResponseData> {
    let response: any;

    await this.fortniteClient.cosmeticsSearch(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of the requested battle royale cosmetic IDs
   * @param options Options for this endpoint
   */
  public async getCosmeticsSearchByIds(options: Omit<CosmeticsSearchByIDsRequestParams, 'id'> & {
    id: string | string[];
  }): Promise<CosmeticsSearchByIDsResponseData> {
    let response: any;

    await this.fortniteClient.cosmeticsSearchByIDs(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data of a creator code by its name
   * @param options Options for this endpoint
   */
  public async getCreatorCode(options: CreatorCodeRequestParams): Promise<CreatorCodeResponseData> {
    let response: any;

    await this.fortniteClient.creatorCode(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data & images of the BR map & POIs
   * @param options Options for this endpoint
   */
  public async getMap(options?: BRMapRequestParams): Promise<BRMapResponseData> {
    let response: any;

    await this.fortniteClient.brMap(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data of the current battle royale, save the world & creative news
   * @param options Options for this endpoint
   */
  public async getNews(options?: NewsRequestParams): Promise<NewsResponseData> {
    let response: any;

    await this.fortniteClient.news(options)
      .then((res: NewsResponseData): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data of the current battle royale news
   * @param options Options for this endpoint
   */
  public async getBatelRoyaleNews(options?: BRNewsRequestParams): Promise<BRNewsResponseData> {
    let response: any;

    await this.fortniteClient.brNews(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data of the current save the world news
   * @param options Options for this endpoint
   */
  public async getSaveTheWorldNews(options?: STWNewsRequestParams): Promise<STWNewsResponseData> {
    let response: any;

    await this.fortniteClient.stwNews(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data of the current creative news
   * @param options Options for this endpoint
   */
  public async getCreativeNews(options?: CreativeNewsRequestParams): Promise<CreativeNewsResponseData> {
    let response: any;

    await this.fortniteClient.creativeNews(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns stats of the requested player account
   * Note: trios stats will always be null
   * @param username username for this endpoint
   */
  public async getFortniteNews(username?: string): Promise<any> {
    let response: any;

    await fetch(`https://www.fortnite.com/api/blog/getPosts?category=&postsPerPage=0&offset=0&locale=es-ES&rootPageSlug=blog`)
      .then((res: any) => res.json())
      .then((responseJson: any) => {
        response = responseJson.blogList
      })
      .catch((err) => {
        console.log('err', err)
      });

    return response;
  }

  /**
   * Returns an array of all playlists
   * @param options Options for this endpoint
   */
  public async getPlaylists(options?: PlaylistsRequestParams): Promise<PlaylistsResponseData> {
    let response: any;

    await this.fortniteClient.playlists(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data of the requested playlist ID
   * @param options Options for this endpoint
   */
  public async getPlaylistById(options: {
    id: string;
  } & PlaylistByIDRequestParams): Promise<PlaylistByIDResponseData> {
    let response: any;

    await this.fortniteClient.playlistById(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data of the current battle royale shop
   * @param options Options for this endpoint
   */
  public async getBatelRoyaleShop(options?: BRShopRequestParams): Promise<BRShopResponseData> {
    let response: any;

    await this.fortniteClient.brShop(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns data of the current battle royale shop (combines the special and default categories into one)
   * @param options Options for this endpoint
   */
  public async getBatelRoyaleShopCombined(options?: BRShopCombinedRequestParams): Promise<BRShopCombinedResponseData> {
    let response: any;

    await this.fortniteClient.brShopCombined(options)
      .then((res): void => {
        response = res
      })
      .catch((err): void => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns Api configuration objects depend on the request
   * Note: client is undefined as default
   * @param client client type for requests
   * @param newApi newApi type for requests
   */
  private ApiConfig(client = false, newApi?: boolean): string | IFortniteApiConfig | ClientOptions {
    const fortniteApiIoConfig: string = "cdea95c0-f20fbd17-1d88e5b9-1b216e0e";

    const fortniteApiConfig: IFortniteApiConfig = {
      headers: {
        Authorization: "442ebed4-083d-4e07-af54-2f6ba429a4a9",
      },
    }

    const fortniteClientApiConfig: ClientOptions = {
      language: Language.Spanish,
      apiKey: '442ebed4-083d-4e07-af54-2f6ba429a4a9',
    }
    return (client ? newApi ? fortniteApiIoConfig : fortniteClientApiConfig : fortniteApiConfig)
  }
}

