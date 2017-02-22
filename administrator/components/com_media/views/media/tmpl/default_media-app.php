<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_media
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
defined('_JEXEC') or die;
?>
<script type="text/x-template" id="media-app">
    <div class="media-container" :style="{minHeight: fullHeight}">
        <media-toolbar></media-toolbar>
        <div class="media-main">
            <div class="media-sidebar">
                <media-tree :root="'/'"></media-tree>
            </div>
            <media-browser></media-browser>
        </div>
    </div>
</script>