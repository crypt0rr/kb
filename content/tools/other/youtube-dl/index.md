---
title : "YouTube-dl"
# pre : ' '
description : "Download videos from youtube.com or other video platforms."
date : 2020-11-18T13:49:03+01:00
# hidden : true
# draft : true
weight : 2110
# tags : ['']
---

---

**NOTE:** Please check [yt-dlp]({{< ref "yt-dlp" >}}), yt-dlp is a youtube-dl fork based on the now inactive youtube-dl.

By default youtube-dl tries to download the best available quality.

## Installation

```plain
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
```

```plain
sudo chmod +x /usr/local/bin/youtube-dl
```

## Usage

```plain
youtube-dl [OPTIONS] URL [URL...]
```

## Flags

```plain
Options:
  General Options:
    -h, --help                           Print this help text and exit
    --version                            Print program version and exit
    -U, --update                         Update this program to latest version. Make sure that you have sufficient permissions (run with sudo
                                         if needed)
    -i, --ignore-errors                  Continue on download errors, for example to skip unavailable videos in a playlist
    --abort-on-error                     Abort downloading of further videos (in the playlist or the command line) if an error occurs
    --dump-user-agent                    Display the current browser identification
    --list-extractors                    List all supported extractors
    --extractor-descriptions             Output descriptions of all supported extractors
    --force-generic-extractor            Force extraction to use the generic extractor
    --default-search PREFIX              Use this prefix for unqualified URLs. For example "gvsearch2:" downloads two videos from google
                                         videos for youtube-dl "large apple". Use the value "auto" to let youtube-dl guess ("auto_warning" to
                                         emit a warning when guessing). "error" just throws an error. The default value "fixup_error" repairs
                                         broken URLs, but emits an error if this is not possible instead of searching.
    --ignore-config                      Do not read configuration files. When given in the global configuration file /etc/youtube-dl.conf: Do
                                         not read the user configuration in ~/.config/youtube-dl/config (%APPDATA%/youtube-dl/config.txt on
                                         Windows)
    --config-location PATH               Location of the configuration file; either the path to the config or its containing directory.
    --flat-playlist                      Do not extract the videos of a playlist, only list them.
    --mark-watched                       Mark videos watched (YouTube only)
    --no-mark-watched                    Do not mark videos watched (YouTube only)
    --no-color                           Do not emit color codes in output

  Network Options:
    --proxy URL                          Use the specified HTTP/HTTPS/SOCKS proxy. To enable SOCKS proxy, specify a proper scheme. For example
                                         socks5://127.0.0.1:1080/. Pass in an empty string (--proxy "") for direct connection
    --socket-timeout SECONDS             Time to wait before giving up, in seconds
    --source-address IP                  Client-side IP address to bind to
    -4, --force-ipv4                     Make all connections via IPv4
    -6, --force-ipv6                     Make all connections via IPv6

  Geo Restriction:
    --geo-verification-proxy URL         Use this proxy to verify the IP address for some geo-restricted sites. The default proxy specified by
                                         --proxy (or none, if the option is not present) is used for the actual downloading.
    --geo-bypass                         Bypass geographic restriction via faking X-Forwarded-For HTTP header
    --no-geo-bypass                      Do not bypass geographic restriction via faking X-Forwarded-For HTTP header
    --geo-bypass-country CODE            Force bypass geographic restriction with explicitly provided two-letter ISO 3166-2 country code
    --geo-bypass-ip-block IP_BLOCK       Force bypass geographic restriction with explicitly provided IP block in CIDR notation

  Video Selection:
    --playlist-start NUMBER              Playlist video to start at (default is 1)
    --playlist-end NUMBER                Playlist video to end at (default is last)
    --playlist-items ITEM_SPEC           Playlist video items to download. Specify indices of the videos in the playlist separated by commas
                                         like: "--playlist-items 1,2,5,8" if you want to download videos indexed 1, 2, 5, 8 in the playlist.
                                         You can specify range: "--playlist-items 1-3,7,10-13", it will download the videos at index 1, 2, 3,
                                         7, 10, 11, 12 and 13.
    --match-title REGEX                  Download only matching titles (regex or caseless sub-string)
    --reject-title REGEX                 Skip download for matching titles (regex or caseless sub-string)
    --max-downloads NUMBER               Abort after downloading NUMBER files
    --min-filesize SIZE                  Do not download any videos smaller than SIZE (e.g. 50k or 44.6m)
    --max-filesize SIZE                  Do not download any videos larger than SIZE (e.g. 50k or 44.6m)
    --date DATE                          Download only videos uploaded in this date
    --datebefore DATE                    Download only videos uploaded on or before this date (i.e. inclusive)
    --dateafter DATE                     Download only videos uploaded on or after this date (i.e. inclusive)
    --min-views COUNT                    Do not download any videos with less than COUNT views
    --max-views COUNT                    Do not download any videos with more than COUNT views
    --match-filter FILTER                Generic video filter. Specify any key (see the "OUTPUT TEMPLATE" for a list of available keys) to
                                         match if the key is present, !key to check if the key is not present, key > NUMBER (like
                                         "comment_count > 12", also works with >=, <, <=, !=, =) to compare against a number, key = 'LITERAL'
                                         (like "uploader = 'Mike Smith'", also works with !=) to match against a string literal and & to
                                         require multiple matches. Values which are not known are excluded unless you put a question mark (?)
                                         after the operator. For example, to only match videos that have been liked more than 100 times and
                                         disliked less than 50 times (or the dislike functionality is not available at the given service), but
                                         who also have a description, use --match-filter "like_count > 100 & dislike_count <? 50 &
                                         description" .
    --no-playlist                        Download only the video, if the URL refers to a video and a playlist.
    --yes-playlist                       Download the playlist, if the URL refers to a video and a playlist.
    --age-limit YEARS                    Download only videos suitable for the given age
    --download-archive FILE              Download only videos not listed in the archive file. Record the IDs of all downloaded videos in it.
    --include-ads                        Download advertisements as well (experimental)

  Download Options:
    -r, --limit-rate RATE                Maximum download rate in bytes per second (e.g. 50K or 4.2M)
    -R, --retries RETRIES                Number of retries (default is 10), or "infinite".
    --fragment-retries RETRIES           Number of retries for a fragment (default is 10), or "infinite" (DASH, hlsnative and ISM)
    --skip-unavailable-fragments         Skip unavailable fragments (DASH, hlsnative and ISM)
    --abort-on-unavailable-fragment      Abort downloading when some fragment is not available
    --keep-fragments                     Keep downloaded fragments on disk after downloading is finished; fragments are erased by default
    --buffer-size SIZE                   Size of download buffer (e.g. 1024 or 16K) (default is 1024)
    --no-resize-buffer                   Do not automatically adjust the buffer size. By default, the buffer size is automatically resized
                                         from an initial value of SIZE.
    --http-chunk-size SIZE               Size of a chunk for chunk-based HTTP downloading (e.g. 10485760 or 10M) (default is disabled). May be
                                         useful for bypassing bandwidth throttling imposed by a webserver (experimental)
    --playlist-reverse                   Download playlist videos in reverse order
    --playlist-random                    Download playlist videos in random order
    --xattr-set-filesize                 Set file xattribute ytdl.filesize with expected file size
    --hls-prefer-native                  Use the native HLS downloader instead of ffmpeg
    --hls-prefer-ffmpeg                  Use ffmpeg instead of the native HLS downloader
    --hls-use-mpegts                     Use the mpegts container for HLS videos, allowing to play the video while downloading (some players
                                         may not be able to play it)
    --external-downloader COMMAND        Use the specified external downloader. Currently supports aria2c,avconv,axel,curl,ffmpeg,httpie,wget
    --external-downloader-args ARGS      Give these arguments to the external downloader

  Filesystem Options:
    -a, --batch-file FILE                File containing URLs to download ('-' for stdin), one URL per line. Lines starting with '#', ';' or
                                         ']' are considered as comments and ignored.
    --id                                 Use only video ID in file name
    -o, --output TEMPLATE                Output filename template, see the "OUTPUT TEMPLATE" for all the info
    --output-na-placeholder PLACEHOLDER  Placeholder value for unavailable meta fields in output filename template (default is "NA")
    --autonumber-start NUMBER            Specify the start value for %(autonumber)s (default is 1)
    --restrict-filenames                 Restrict filenames to only ASCII characters, and avoid "&" and spaces in filenames
    -w, --no-overwrites                  Do not overwrite files
    -c, --continue                       Force resume of partially downloaded files. By default, youtube-dl will resume downloads if possible.
    --no-continue                        Do not resume partially downloaded files (restart from beginning)
    --no-part                            Do not use .part files - write directly into output file
    --no-mtime                           Do not use the Last-modified header to set the file modification time
    --write-description                  Write video description to a .description file
    --write-info-json                    Write video metadata to a .info.json file
    --write-annotations                  Write video annotations to a .annotations.xml file
    --load-info-json FILE                JSON file containing the video information (created with the "--write-info-json" option)
    --cookies FILE                       File to read cookies from and dump cookie jar in
    --cache-dir DIR                      Location in the filesystem where youtube-dl can store some downloaded information permanently. By
                                         default $XDG_CACHE_HOME/youtube-dl or ~/.cache/youtube-dl . At the moment, only YouTube player files
                                         (for videos with obfuscated signatures) are cached, but that may change.
    --no-cache-dir                       Disable filesystem caching
    --rm-cache-dir                       Delete all filesystem cache files

  Thumbnail images:
    --write-thumbnail                    Write thumbnail image to disk
    --write-all-thumbnails               Write all thumbnail image formats to disk
    --list-thumbnails                    Simulate and list all available thumbnail formats

  Verbosity / Simulation Options:
    -q, --quiet                          Activate quiet mode
    --no-warnings                        Ignore warnings
    -s, --simulate                       Do not download the video and do not write anything to disk
    --skip-download                      Do not download the video
    -g, --get-url                        Simulate, quiet but print URL
    -e, --get-title                      Simulate, quiet but print title
    --get-id                             Simulate, quiet but print id
    --get-thumbnail                      Simulate, quiet but print thumbnail URL
    --get-description                    Simulate, quiet but print video description
    --get-duration                       Simulate, quiet but print video length
    --get-filename                       Simulate, quiet but print output filename
    --get-format                         Simulate, quiet but print output format
    -j, --dump-json                      Simulate, quiet but print JSON information. See the "OUTPUT TEMPLATE" for a description of available
                                         keys.
    -J, --dump-single-json               Simulate, quiet but print JSON information for each command-line argument. If the URL refers to a
                                         playlist, dump the whole playlist information in a single line.
    --print-json                         Be quiet and print the video information as JSON (video is still being downloaded).
    --newline                            Output progress bar as new lines
    --no-progress                        Do not print progress bar
    --console-title                      Display progress in console titlebar
    -v, --verbose                        Print various debugging information
    --dump-pages                         Print downloaded pages encoded using base64 to debug problems (very verbose)
    --write-pages                        Write downloaded intermediary pages to files in the current directory to debug problems
    --print-traffic                      Display sent and read HTTP traffic
    -C, --call-home                      Contact the youtube-dl server for debugging
    --no-call-home                       Do NOT contact the youtube-dl server for debugging

  Workarounds:
    --encoding ENCODING                  Force the specified encoding (experimental)
    --no-check-certificate               Suppress HTTPS certificate validation
    --prefer-insecure                    Use an unencrypted connection to retrieve information about the video. (Currently supported only for
                                         YouTube)
    --user-agent UA                      Specify a custom user agent
    --referer URL                        Specify a custom referer, use if the video access is restricted to one domain
    --add-header FIELD:VALUE             Specify a custom HTTP header and its value, separated by a colon ':'. You can use this option
                                         multiple times
    --bidi-workaround                    Work around terminals that lack bidirectional text support. Requires bidiv or fribidi executable in
                                         PATH
    --sleep-interval SECONDS             Number of seconds to sleep before each download when used alone or a lower bound of a range for
                                         randomized sleep before each download (minimum possible number of seconds to sleep) when used along
                                         with --max-sleep-interval.
    --max-sleep-interval SECONDS         Upper bound of a range for randomized sleep before each download (maximum possible number of seconds
                                         to sleep). Must only be used along with --min-sleep-interval.

  Video Format Options:
    -f, --format FORMAT                  Video format code, see the "FORMAT SELECTION" for all the info
    --all-formats                        Download all available video formats
    --prefer-free-formats                Prefer free video formats unless a specific one is requested
    -F, --list-formats                   List all available formats of requested videos
    --youtube-skip-dash-manifest         Do not download the DASH manifests and related data on YouTube videos
    --merge-output-format FORMAT         If a merge is required (e.g. bestvideo+bestaudio), output to given container format. One of mkv, mp4,
                                         ogg, webm, flv. Ignored if no merge is required

  Subtitle Options:
    --write-sub                          Write subtitle file
    --write-auto-sub                     Write automatically generated subtitle file (YouTube only)
    --all-subs                           Download all the available subtitles of the video
    --list-subs                          List all available subtitles for the video
    --sub-format FORMAT                  Subtitle format, accepts formats preference, for example: "srt" or "ass/srt/best"
    --sub-lang LANGS                     Languages of the subtitles to download (optional) separated by commas, use --list-subs for available
                                         language tags

  Authentication Options:
    -u, --username USERNAME              Login with this account ID
    -p, --password PASSWORD              Account password. If this option is left out, youtube-dl will ask interactively.
    -2, --twofactor TWOFACTOR            Two-factor authentication code
    -n, --netrc                          Use .netrc authentication data
    --video-password PASSWORD            Video password (vimeo, youku)

  Adobe Pass Options:
    --ap-mso MSO                         Adobe Pass multiple-system operator (TV provider) identifier, use --ap-list-mso for a list of
                                         available MSOs
    --ap-username USERNAME               Multiple-system operator account login
    --ap-password PASSWORD               Multiple-system operator account password. If this option is left out, youtube-dl will ask
                                         interactively.
    --ap-list-mso                        List all supported multiple-system operators

  Post-processing Options:
    -x, --extract-audio                  Convert video files to audio-only files (requires ffmpeg/avconv and ffprobe/avprobe)
    --audio-format FORMAT                Specify audio format: "best", "aac", "flac", "mp3", "m4a", "opus", "vorbis", or "wav"; "best" by
                                         default; No effect without -x
    --audio-quality QUALITY              Specify ffmpeg/avconv audio quality, insert a value between 0 (better) and 9 (worse) for VBR or a
                                         specific bitrate like 128K (default 5)
    --recode-video FORMAT                Encode the video to another format if necessary (currently supported: mp4|flv|ogg|webm|mkv|avi)
    --postprocessor-args ARGS            Give these arguments to the postprocessor
    -k, --keep-video                     Keep the video file on disk after the post-processing; the video is erased by default
    --no-post-overwrites                 Do not overwrite post-processed files; the post-processed files are overwritten by default
    --embed-subs                         Embed subtitles in the video (only for mp4, webm and mkv videos)
    --embed-thumbnail                    Embed thumbnail in the audio as cover art
    --add-metadata                       Write metadata to the video file
    --metadata-from-title FORMAT         Parse additional metadata like song title / artist from the video title. The format syntax is the
                                         same as --output. Regular expression with named capture groups may also be used. The parsed
                                         parameters replace existing values. Example: --metadata-from-title "%(artist)s - %(title)s" matches a
                                         title like "Coldplay - Paradise". Example (regex): --metadata-from-title "(?P<artist>.+?) -
                                         (?P<title>.+)"
    --xattrs                             Write metadata to the video file's xattrs (using dublin core and xdg standards)
    --fixup POLICY                       Automatically correct known faults of the file. One of never (do nothing), warn (only emit a
                                         warning), detect_or_warn (the default; fix file if we can, warn otherwise)
    --prefer-avconv                      Prefer avconv over ffmpeg for running the postprocessors
    --prefer-ffmpeg                      Prefer ffmpeg over avconv for running the postprocessors (default)
    --ffmpeg-location PATH               Location of the ffmpeg/avconv binary; either the path to the binary or its containing directory.
    --exec CMD                           Execute a command on the file after downloading and post-processing, similar to find's -exec syntax.
                                         Example: --exec 'adb push {} /sdcard/Music/ && rm {}'
    --convert-subs FORMAT                Convert the subtitles to other format (currently supported: srt|ass|vtt|lrc)
```

### Youtube-dl can download from this sources

```plain
1tv, 1up.com, 20min, 220.ro, 23video, 24video, 3qsdn, 3sat, 4tube, 56.com, 5min, 6play, 7plus, 8tracks, 91porn, 9c9media, 9gag, 9now.com.au, abc.net.au, abc.net.au:iview, abcnews, abcnews:video, abcotvs, abcotvs:clips, AcademicEarth:Course, acast, acast:channel, ADN, AdobeConnect, adobetv, adobetv:channel, adobetv:embed, adobetv:show, adobetv:video, AdultSwim, aenetworks, afreecatv, AirMozilla, AliExpressLive, AlJazeera, Allocine, AlphaPorno, AMCNetworks, AmericasTestKitchen, anderetijden, AnimeOnDemand, Anvato, aol.com, APA, Aparat, AppleConnect, AppleDaily, appletrailers, appletrailers:section, archive.org, ARD, ARD:mediathek, ARDBetaMediathek, Arkena, arte.tv:+7, arte.tv:embed, arte.tv:playlist, AsianCrush, AsianCrushPlaylist, AtresPlayer, ATTTechChannel, ATVAt, AudiMedia, AudioBoom, audiomack, audiomack:album, AWAAN, awaan:live, awaan:season, awaan:video, AZMedien, BaiduVideo, Bandcamp, Bandcamp:album, Bandcamp:weekly, bangumi.bilibili.com, bbc, bbc.co.uk, bbc.co.uk:article, bbc.co.uk:iplayer:playlist, bbc.co.uk:playlist, BBVTV, Beatport, Beeg, BehindKink, Bellator, BellMedia, Bet, bfi:player, Bigflix, Bild, BiliBili, BilibiliAudio, BilibiliAudioAlbum, BiliBiliPlayer, BioBioChileTV, BIQLE, BitChute, BitChuteChannel, BleacherReport, BleacherReportCMS, blinkx, Bloomberg, BokeCC, BostonGlobe, Bpb, BR, BravoTV, Break, brightcove:legacy, brightcove:new, BRMediathek, bt:article, bt:vestlendingen, BusinessInsider, BuzzFeed, BYUtv, Camdemy, CamdemyFolder, CamModels, CamTube, CamWithHer, canalc2.tv, Canalplus, Canvas, CanvasEen, CarambaTV, CarambaTVPage, CartoonNetwork, cbc.ca, cbc.ca:olympics, cbc.ca:player, cbc.ca:watch, cbc.ca:watch:video, CBS, CBSInteractive, CBSLocal, cbsnews, cbsnews:embed, cbsnews:livevideo, CBSSports, CCMA, CCTV, CDA, CeskaTelevize, CeskaTelevizePorady, channel9, CharlieRose, Chaturbate, Chilloutzone, chirbit, chirbit:profile, Cinchcast, Cinemax, CiscoLiveSearch, CiscoLiveSession, CJSW, cliphunter, Clippit, ClipRs, Clipsyndicate, CloserToTruth, CloudflareStream, Cloudy, Clubic, Clyp, cmt.com, CNBC, CNBCVideo, CNN, CNNArticle, CNNBlogs, ComedyCentral, ComedyCentralFullEpisodes, ComedyCentralShortname, ComedyCentralTV, CommonMistakes, CondeNast, CONtv, Corus, Coub, Cracked, Crackle, CrooksAndLiars, crunchyroll, crunchyroll:playlist, CSNNE, CSpan, CtsNews, CTVNews, cu.ntv.co.jp, Culturebox, CultureUnplugged, curiositystream, curiositystream:collection, CWTV, DailyMail, dailymotion, dailymotion:playlist, dailymotion:user, daum.net, daum.net:clip, daum.net:playlist, daum.net:user, DBTV, DctpTv, DeezerPlaylist, defense.gouv.fr, democracynow, DHM, Digg, DigitallySpeaking, Digiteka, Discovery, DiscoveryGo, DiscoveryGoPlaylist, DiscoveryNetworksDe, DiscoveryVR, Disney, dlive:stream, dlive:vod, Dotsub, DouyuShow, DouyuTV, DPlay, DRBonanza, Dropbox, DrTuber, drtv, drtv:live, DTube, Dumpert, dvtv, dw, dw:article, EaglePlatform, EbaumsWorld, EchoMsk, egghead:course, egghead:lesson, ehftv, eHow, EinsUndEinsTV, Einthusan, eitb.tv, EllenTube, EllenTubePlaylist, EllenTubeVideo, ElPais, Embedly, EMPFlix, Engadget, Eporner, EroProfile, Escapist, ESPN, ESPNArticle, EsriVideo, Europa, EveryonesMixtape, EWETV, ExpoTV, Expressen, ExtremeTube, EyedoTV, facebook, FacebookPluginsVideo, faz.net, fc2, fc2:embed, Fczenit, filmon, filmon:channel, Filmweb, FiveThirtyEight, FiveTV, Flickr, Folketinget, FootyRoom, Formula1, FOX, FOX9, FOX9News, Foxgay, foxnews, foxnews:article, FoxSports, france2.fr:generation-what, FranceCulture, FranceInter, FranceTV, FranceTVEmbed, francetvinfo.fr, FranceTVJeunesse, FranceTVSite, Freesound, freespeech.org, FreshLive, FrontendMasters, FrontendMastersCourse, FrontendMastersLesson, Funimation, Funk, Fusion, Fux, FXNetworks, Gaia, GameInformer, GameSpot, GameStar, Gaskrank, Gazeta, GDCVault, generic, Gfycat, GiantBomb, Giga, GlattvisionTV, Glide, Globo, GloboArticle, Go, GodTube, Golem, GoogleDrive, Goshgay, GPUTechConf, Groupon, hbo, HearThisAt, Heise, HellPorno, Helsinki, HentaiStigma, hetklokhuis, hgtv.com:show, HiDive, HistoricFilms, history:topic, hitbox, hitbox:live, HitRecord, hketv, HornBunny, HotNewHipHop, hotstar, hotstar:playlist, Howcast, HowStuffWorks, HRTi, HRTiPlaylist, Huajiao, HuffPost, Hungama, HungamaSong, Hypem, ign.com, imdb, imdb:list, Imgur, imgur:album, imgur:gallery, Ina, Inc, IndavideoEmbed, InfoQ, Instagram, instagram:tag, instagram:user, Internazionale, InternetVideoArchive, IPrima, iqiyi, Ir90Tv, ITTF, ITV, ITVBTCC, ivi, ivi:compilation, ivideon, Iwara, Izlesene, Jamendo, JamendoAlbum, JeuxVideo, Joj, Jove, JWPlatform, Kakao, Kaltura, KanalPlay, Kankan, Karaoketv, KarriereVideos, Katsomo, KeezMovies, Ketnet, KhanAcademy, KickStarter, KinjaEmbed, KinoPoisk, KonserthusetPlay, KrasView, Ku6, KUSI, kuwo:album, kuwo:category, kuwo:chart, kuwo:mv, kuwo:singer, kuwo:song, la7.it, laola1tv, laola1tv:embed, lbry.tv, LCI, Lcp, LcpPlay, Le, Lecture2Go, Lecturio, LecturioCourse, LecturioDeCourse, LEGO, Lemonde, Lenta, LePlaylist, LetvCloud, Libsyn, life, life:embed, limelight, limelight:channel, limelight:channel_list, LineTV, linkedin:learning, linkedin:learning:course, LinuxAcademy, LiTV, LiveJournal, LiveLeak, LiveLeakEmbed, livestream, livestream:original, livestream:shortener, LnkGo, loc, LocalNews8, LoveHomePorn, lrt.lt, lynda, lynda:course, m6, mailru, mailru:music, mailru:music:search, MallTV, mangomolo:live, mangomolo:video, ManyVids, Markiza, MarkizaPage, massengeschmack.tv, MatchTV, MDR, media.ccc.de, media.ccc.de:lists, Medialaan, Mediaset, Mediasite, MediasiteCatalog, MediasiteNamedCatalog, Medici, megaphone.fm, Meipai, MelonVOD, META, metacafe, Metacritic, Mgoon, MGTV, MiaoPai, MinistryGrid, Minoto, miomio.tv, MiTele, mixcloud, mixcloud:playlist, mixcloud:user, Mixer:live, Mixer:vod, MLB, Mms, Mnet, MNetTV, MoeVideo, Mofosex, MofosexEmbed, Mojvideo, Morningstar, Motherless, MotherlessGroup, Motorsport, MovieClips, MovieFap, Moviezine, MovingImage, MSN, mtg, mtv, mtv.de, mtv:video, mtvjapan, mtvservices:embedded, MuenchenTV, mva, mva:course, Mwave, MwaveMeetGreet, MyChannels, MySpace, MySpace:album, MySpass, Myvi, MyVidster, MyviEmbed, MyVisionTV, n-tv.de, natgeo:video, NationalGeographicTV, Naver, NBA, NBC, NBCNews, nbcolympics, nbcolympics:stream, NBCSports, NBCSportsStream, NBCSportsVPlayer, ndr, ndr:embed, ndr:embed:base, NDTV, NerdCubedFeed, netease:album, netease:djradio, netease:mv, netease:playlist, netease:program, netease:singer, netease:song, NetPlus, Netzkino, Newgrounds, NewgroundsPlaylist, Newstube, NextMedia, NextMediaActionNews, NextTV, Nexx, NexxEmbed, nfl.com, NhkVod, nhl.com, nick.com, nick.de, nickelodeon:br, nickelodeonru, nicknight, niconico, NiconicoPlaylist, Nintendo, njoy, njoy:embed, NJPWWorld, NobelPrize, Noco, NonkTube, Noovo, Normalboots, NosVideo, Nova, NovaEmbed, nowness, nowness:playlist, nowness:series, Noz, npo, npo.nl:live, npo.nl:radio, npo.nl:radio:fragment, Npr, NRK, NRKPlaylist, NRKSkole, NRKTV, NRKTVDirekte, NRKTVEpisode, NRKTVEpisodes, NRKTVSeason, NRKTVSeries, NRLTV, ntv.ru, Nuvid, NYTimes, NYTimesArticle, NZZ, ocw.mit.edu, OdaTV, Odnoklassniki, OktoberfestTV, OnDemandKorea, onet.pl, onet.tv, onet.tv:channel, OnetMVP, OnionStudios, Ooyala, OoyalaExternal, OraTV, orf:burgenland, orf:fm4, orf:fm4:story, orf:iptv, orf:kaernten, orf:noe, orf:oberoesterreich, orf:oe1, orf:oe3, orf:salzburg, orf:steiermark, orf:tirol, orf:tvthek, orf:vorarlberg, orf:wien, OsnatelTV, OutsideTV, PacktPub, PacktPubCourse, pandora.tv, ParamountNetwork, parliamentlive.tv, Patreon, pbs, pcmag, PearVideo, PeerTube, People, PerformGroup, periscope, periscope:user, PhilharmonieDeParis, phoenix.de, Photobucket, Picarto, PicartoVod, Piksel, Pinkbike, Pladform, Platzi, PlatziCourse, play.fm, PlayPlusTV, PlaysTV, Playtvak, Playvid, Playwire, pluralsight, pluralsight:course, plus.google, podomatic, Pokemon, PolskieRadio, PolskieRadioCategory, Popcorntimes, PopcornTV, PornCom, PornerBros, PornHd, PornHub, PornHubPagedVideoList, PornHubUser, PornHubUserVideosUpload, Pornotube, PornoVoisines, PornoXO, PornTube, PressTV, prosiebensat1, puhutv, puhutv:serie, Puls4, Pyvideo, qqmusic, qqmusic:album, qqmusic:playlist, qqmusic:singer, qqmusic:toplist, QuantumTV, Quickline, QuicklineLive, R7, R7Article, radio.de, radiobremen, radiocanada, radiocanada:audiovideo, radiofrance, RadioJavan, Rai, RaiPlay, RaiPlayLive, RaiPlayPlaylist, RayWenderlich, RayWenderlichCourse, RBMARadio, RDS, RedBull, RedBullEmbed, RedBullTV, RedBullTVRrnContent, Reddit, RedditR, RedTube, RegioTV, RENTV, RENTVArticle, Restudy, Reuters, ReverbNation, RICE, RMCDecouverte, RockstarGames, RoosterTeeth, RottenTomatoes, Roxwel, Rozhlas, RTBF, rte, rte:radio, rtl.nl, rtl2, rtl2:you, rtl2:you:series, Rtmp, RTP, RTS, rtve.es:alacarta, rtve.es:infantil, rtve.es:live, rtve.es:television, RTVNH, RTVS, RUHD, rutube, rutube:channel, rutube:embed, rutube:movie, rutube:person, rutube:playlist, RUTV, Ruutu, Ruv, safari, safari:api, safari:course, SAKTV, SaltTV, Sapo, savefrom.net, SBS, schooltv, screen.yahoo:search, Screencast, ScreencastOMatic, ScrippsNetworks, scrippsnetworks:watch, SCTE, SCTECourse, Seeker, SenateISVP, SendtoNews, Servus, Sexu, SeznamZpravy, SeznamZpravyArticle, Shahid, ShahidShow, Shared, ShowRoomLive, Sina, SkylineWebcams, SkyNews, skynewsarabia:article, skynewsarabia:video, SkySports, Slideshare, SlidesLive, Slutload, smotri, smotri:broadcast, smotri:community, smotri:user, Snotr, Sohu, SonyLIV, soundcloud, soundcloud:playlist, soundcloud:search, soundcloud:set, soundcloud:trackstation, soundcloud:user, SoundcloudEmbed, soundgasm, soundgasm:profile, southpark.cc.com, southpark.cc.com:español, southpark.de, southpark.nl, southparkstudios.dk, SpankBang, SpankBangPlaylist, Spankwire, Spiegel, sport.francetvinfo.fr, Sport5, SportBox, SportDeutschland, SpringboardPlatform, Sprout, sr:mediathek, SRGSSR, SRGSSRPlay, stanfordoc, Steam, Stitcher, Streamable, streamcloud.eu, StreamCZ, StreetVoice, StretchInternet, stv:player, SunPorno, sverigesradio:episode, sverigesradio:publication, SVT, SVTPage, SVTPlay, SVTSeries, SWRMediathek, Syfy, SztvHu, t-online.de, Tagesschau, tagesschau:player, Tass, TastyTrade, TBS, TDSLifeway, Teachable, TeachableCourse, teachertube, teachertube:user:collection, TeachingChannel, Teamcoco, TeamTreeHouse, TechTalks, techtv.mit.edu, ted, Tele13, Tele5, TeleBruxelles, Telecinco, Telegraaf, TeleMB, TeleQuebec, TeleQuebecEmission, TeleQuebecLive, TeleQuebecSquat, TeleTask, Telewebion, TennisTV, TenPlay, TestURL, TF1, TFO, TheIntercept, ThePlatform, ThePlatformFeed, TheScene, TheStar, TheSun, TheWeatherChannel, ThisAmericanLife, ThisAV, ThisOldHouse, TikTok, TikTokUser, tinypic, TMZ, TMZArticle, TNAFlix, TNAFlixNetworkEmbed, toggle, ToonGoggles, Tosh, tou.tv, Toypics, ToypicsUser, TrailerAddict (CURRENTLY BROKEN), Trilulilu, TruNews, TruTV, Tube8, TubiTv, Tumblr, tunein:clip, tunein:program, tunein:shortener, tunein:station, tunein:topic, TunePk, Turbo, tv.dfb.de, TV2, tv2.hu, TV2Article, TV2DK, TV2DKBornholmPlay, TV4, TV5MondePlus, TVA, TVANouvelles, TVANouvellesArticle, TVC, TVCArticle, tvigle, tvland.com, TVN24, TVNet, TVNoe, TVNow, TVNowAnnual, TVNowNew, TVNowSeason, TVNowShow, tvp, tvp:embed, tvp:series, TVPlayer, TVPlayHome, Tweakers, TwitCasting, twitch:clips, twitch:stream, twitch:vod, TwitchCollection, TwitchVideos, TwitchVideosClips, TwitchVideosCollections, twitter, twitter:amplify, twitter:broadcast, twitter:card, udemy, udemy:course, UDNEmbed, UFCArabia, UFCTV, UKTVPlay, umg:de, UnicodeBOM, Unistra, Unity, uol.com.br, uplynk, uplynk:preplay, Urort, URPlay, USANetwork, USAToday, ustream, ustream:channel, ustudio, ustudio:embed, Varzesh3, Vbox7, VeeHD, Veoh, Vesti, Vevo, VevoPlaylist, VGTV, vh1.com, vhx:embed, Viafree, vice, vice:article, vice:show, Vidbit, Viddler, Videa, video.google:search, VideoDetective, videofy.me, videomore, videomore:season, videomore:video, VideoPress, Vidio, VidLii, vidme, vidme:user, vidme:user:likes, Vidzi, vier, vier:videos, viewlift, viewlift:embed, Viidea, viki, viki:channel, vimeo, vimeo:album, vimeo:channel, vimeo:group, vimeo:likes, vimeo:ondemand, vimeo:review, vimeo:user, vimeo:watchlater, Vimple, Vine, vine:user, Viqeo, Viu, viu:ott, viu:playlist, Vivo, vk, vk:uservideos, vk:wallpost, vlive, vlive:channel, Vodlocker, VODPl, VODPlatform, VoiceRepublic, Voot, VoxMedia, VoxMediaVolume, vpro, Vrak, VRT, VrtNU, vrv, vrv:series, VShare, VTXTV, vube, VuClip, VVVVID, VyboryMos, Vzaar, Wakanim, Walla, WalyTV, washingtonpost, washingtonpost:article, wat.tv, WatchBox, WatchIndianPorn, WDR, wdr:mobile, WDRElefant, WDRPage, Webcaster, WebcasterFeed, WebOfStories, WebOfStoriesPlaylist, Weibo, WeiboMobile, WeiqiTV, Wistia, wnl, WorldStarHipHop, WSJ, WSJArticle, WWE, XBef, XboxClips, XFileShare, XHamster, XHamsterEmbed, XHamsterUser, xiami:album, xiami:artist, xiami:collection, xiami:song, ximalaya, ximalaya:album, XMinus, XNXX, Xstream, XTube, XTubeUser, Xuite, XVideos, XXXYMovies, Yahoo, yahoo:gyao, yahoo:gyao:player, yahoo:japannews, YandexDisk, yandexmusic:album, yandexmusic:playlist, yandexmusic:track, YandexVideo, YapFiles, YesJapan, yinyuetai:video, Ynet, YouJizz, youku, youku:show, YouNowChannel, YouNowLive, YouNowMoment, YouPorn, YourPorn, YourUpload, youtube, youtube:history, youtube:live, youtube:playlist, youtube:recommended, youtube:search, youtube:search:date, youtube:subscriptions, youtube:tab, youtube:truncated_id, youtube:truncated_url, youtube:watchlater, YoutubeYtUser, Zapiks, Zaq1, Zattoo, ZattooLive, ZDF, ZDFChannel, zingmp3, Zype
```

## Examples

### Download directly without options

By default youtube-dl tries to download the best available quality.

```plain
$ youtube-dl https://www.youtube.com/watch\?v\=dQw4w9WgXcQ
[youtube] dQw4w9WgXcQ: Downloading webpage
[download] Destination: Rick Astley - Never Gonna Give You Up (Video)-dQw4w9WgXcQ.mp4
[download] 100% of 15.19MiB in 00:00
```

### List formats and download specific one

```plain
$ youtube-dl --list-formats https://www.youtube.com/watch\?v\=dQw4w9WgXcQ
[youtube] dQw4w9WgXcQ: Downloading webpage
[info] Available formats for dQw4w9WgXcQ:
format code  extension  resolution note
249          webm       audio only tiny   49k , opus @ 50k (48000Hz), 1.18MiB
250          webm       audio only tiny   65k , opus @ 70k (48000Hz), 1.55MiB
140          m4a        audio only tiny  130k , m4a_dash container, mp4a.40.2@128k (44100Hz), 3.27MiB
251          webm       audio only tiny  136k , opus @160k (48000Hz), 3.28MiB
394          mp4        256x144    144p   75k , av01.0.00M.08, 25fps, video only, 1.75MiB
278          webm       256x144    144p   97k , webm container, vp9, 25fps, video only, 2.25MiB
160          mp4        256x144    144p  113k , avc1.4d400c, 25fps, video only, 2.79MiB
395          mp4        426x240    240p  159k , av01.0.00M.08, 25fps, video only, 3.48MiB
242          webm       426x240    240p  217k , vp9, 25fps, video only, 4.04MiB
133          mp4        426x240    240p  250k , avc1.4d4015, 25fps, video only, 6.16MiB
396          mp4        640x360    360p  332k , av01.0.01M.08, 25fps, video only, 6.94MiB
243          webm       640x360    360p  396k , vp9, 25fps, video only, 6.96MiB
244          webm       854x480    480p  586k , vp9, 25fps, video only, 10.03MiB
397          mp4        854x480    480p  595k , av01.0.04M.08, 25fps, video only, 12.09MiB
134          mp4        640x360    360p  636k , avc1.4d401e, 25fps, video only, 12.99MiB
247          webm       1280x720   720p 1035k , vp9, 25fps, video only, 17.67MiB
398          mp4        1280x720   720p 1125k , av01.0.05M.08, 25fps, video only, 22.93MiB
135          mp4        854x480    480p 1170k , avc1.4d401e, 25fps, video only, 26.07MiB
399          mp4        1920x1080  1080p 2084k , av01.0.08M.08, 25fps, video only, 41.70MiB
136          mp4        1280x720   720p 2318k , avc1.4d401f, 25fps, video only, 53.38MiB
137          mp4        1920x1080  1080p 4466k , avc1.640028, 25fps, video only, 107.66MiB
18           mp4        640x360    360p  601k , avc1.42001E, 25fps, mp4a.40.2@ 96k (44100Hz), 15.19MiB (best)
```

```plain
$ youtube-dl https://www.youtube.com/watch\?v\=dQw4w9WgXcQ -f249
[youtube] dQw4w9WgXcQ: Downloading webpage
[download] Destination: Rick Astley - Never Gonna Give You Up (Video)-dQw4w9WgXcQ.webm
[download] 100% of 1.18MiB in 00:00
```

## URL List

- [GitHub.com - youtube-dl](https://github.com/ytdl-org/youtube-dl)
