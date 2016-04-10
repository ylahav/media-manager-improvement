<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_media
 *
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Media Component File Type Video Model
 */
class MediaModelFileTypeVideo extends MediaModelFileTypeDefault implements MediaModelFileTypeInterface
{
	/**
	 * Name of this file type
	 *
	 * @var string
	 */
	protected $name = 'video';

	/**
	 * File extensions supported by this file type
	 */
	protected $extensions = array(
		'mp4',
		'webp',
		'ogg',
	);

	/**
	 * Return the file properties of a specific file
	 *
	 * @param string $filePath
	 *
	 * @return array
	 */
	public function getProperties($filePath)
	{
		$properties = array();
		$properties['icon_32'] = 'media/mime-icon-32/mp4.png';
		$properties['icon_16'] = 'media/mime-icon-16/mp4.png';

		return $properties;
	}
}