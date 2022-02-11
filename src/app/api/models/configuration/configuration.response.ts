import { BackdropSize } from './backdrop-size.enum';
import { PosterSize } from './poster-size.enum';

export class ConfigurationResponse {
  images!: ImageConfiguration;
  change_keys!: String[];
}

export class ImageConfiguration {
  base_url!: string;
  secure_base_url!: string;
  backdrop_sizes!: BackdropSize[];
  logo_sizes!: string[];
  poster_sizes!: PosterSize[];
  profile_sizes!: string[];
  still_sizes!: string[];
}
