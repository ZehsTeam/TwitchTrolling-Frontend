export type ThunderstorePackage = {
	namespace: string;
	name: string;
	full_name: string;
	owner: string;
	package_url: string;
	date_created: string;
	date_updated: string;
	rating_score: number;
	is_pinned: boolean;
	is_deprecated: boolean;
	total_downloads: number;
	latest: {
		namespace: string;
		name: string;
		version_number: string;
		full_name: string;
		description: string;
		icon: string;
		dependencies: string[];
		download_url: string;
		downloads: number;
		date_created: string;
		website_url: string | null;
		is_active: boolean;
	};
	community_listings: {
		has_nsfw_content: boolean;
		categories: string[];
		community: string;
		review_status: string;
	}[];
};

export async function FetchThunderstorePackage(
	name: string,
	namespace: string
): Promise<ThunderstorePackage> {
	const url = `https://corsproxy.io/?https://thunderstore.io/api/experimental/package/${namespace}/${name}/`;

	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Failed to fetch Thunderstore package: ${res.status} ${res.statusText}`);
	}

	const data: ThunderstorePackage = await res.json();
	return data;
}
