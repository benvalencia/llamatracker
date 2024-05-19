import {Client, ClientConfig, Language} from "fnapicom";
import {
  AESKeysRequestParams,
  AESKeysResponseData,
  BannerColorsRequestParams,
  BannerColorsResponseData,
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

export class FortniteService {
  private fortniteClient = new Client(this.ApiConfig(true) as ClientConfig)

  /**
   * Returns stats of the requested player account
   * Note: trios stats will always be null
   * @param username username for this endpoint
   */
  public async getProfileByUsername(username: string): Promise<IUserProfile> {
    let response: any;

    await fetch(`https://fortnite-api.com/v2/stats/br/v2?name=${encodeURIComponent(username)}`, this.ApiConfig() as RequestInit)
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

  /**
   * Returns an array of all banner colors
   * @param options Options for this endpoint
   */
  public async getBannerColors(options?: BannerColorsRequestParams): Promise<BannerColorsResponseData> {
    let response: any;

    await this.fortniteClient.bannerColors(options)
      .then((res) => {
        response = res
      })
      .catch((err) => {
        console.log('err', err)
      })

    return response
  }

  /**
   * Returns an array of all battle royale cosmetics
   * @param options Options for this endpoint
   */
  public async getCosmeticsList(options?: CosmeticsListRequestParams): Promise<CosmeticsListResponseData> {
    let response: any;

    await this.fortniteClient.bannerColors(options)
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
      .then((res): void => {
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
   */
  private ApiConfig(client?: boolean): IFortniteApiConfig | ClientOptions {
    const fortniteApiConfig: IFortniteApiConfig = {
      headers: {
        Authorization: "442ebed4-083d-4e07-af54-2f6ba429a4a9",
      },
    }
    const fortniteClientApiConfig: ClientOptions = {
      language: Language.Spanish,
      apiKey: '442ebed4-083d-4e07-af54-2f6ba429a4a9',
    }
    return (client ? fortniteClientApiConfig : fortniteApiConfig)
  }
}

